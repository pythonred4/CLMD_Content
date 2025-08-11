#!/usr/bin/env python3
"""
Content Submission Processor for clmd_content Repository

This script processes Netlify form submissions and prepares them for import
into the clmd_content repository. It handles content validation, formatting,
and creates appropriate file structures.
"""

import os
import sys
import json
import yaml
import requests
import re
from datetime import datetime
from pathlib import Path
from urllib.parse import quote

class ContentProcessor:
    def __init__(self):
        self.github_token = os.getenv('GITHUB_TOKEN')
        self.netlify_token = os.getenv('NETLIFY_TOKEN')
        self.netlify_site_id = os.getenv('NETLIFY_SITE_ID')
        self.test_mode = os.getenv('TEST_MODE', 'false').lower() == 'true'
        self.force_process = os.getenv('FORCE_PROCESS', 'false').lower() == 'true'
        
        # Content type mappings
        self.content_type_mappings = {
            'article': 'articles',
            'story': 'stories',
            'poem': 'poems',
            'essay': 'essays',
            'review': 'reviews',
            'other': 'misc'
        }
        
        # Language mappings
        self.language_mappings = {
            'en': 'english',
            'vi': 'vietnamese',
            'my': 'myanmar',
            'th': 'thai',
            'other': 'other'
        }

    def get_latest_submission(self):
        """Get the latest form submission from Netlify"""
        if self.test_mode:
            return self._get_test_submission()
        
        if not self.netlify_token or not self.netlify_site_id:
            print("❌ Missing Netlify credentials. Cannot fetch submissions.")
            return None
        
        try:
            # Fetch form submissions from Netlify
            url = f"https://api.netlify.com/api/v1/sites/{self.netlify_site_id}/forms/content-submission/submissions"
            headers = {
                'Authorization': f'Bearer {self.netlify_token}',
                'Content-Type': 'application/json'
            }
            
            # Get submissions from the last 24 hours
            since = datetime.now().isoformat()
            params = {'since': since}
            
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            
            submissions = response.json()
            
            if not submissions:
                print("No new submissions found.")
                return None
            
            # Get the latest unprocessed submission
            latest = submissions[0]  # Netlify returns newest first
            print(f"Found submission: {latest.get('id', 'unknown')}")
            
            return self._parse_netlify_submission(latest)
            
        except requests.exceptions.RequestException as e:
            print(f"❌ Error fetching submissions from Netlify: {e}")
            return None

    def _parse_netlify_submission(self, submission):
        """Parse submission data from Netlify format"""
        form_data = submission.get('data', {})
        
        return {
            'id': submission.get('id'),
            'title': form_data.get('title', '').strip(),
            'content_type': form_data.get('content-type', '').strip(),
            'author': form_data.get('author', '').strip() or 'Anonymous Contributor',
            'content': form_data.get('content', '').strip(),
            'tags': form_data.get('tags', '').strip(),
            'language': form_data.get('language', '').strip(),
            'content_rating': form_data.get('content-rating', '').strip(),
            'notes': form_data.get('notes', '').strip(),
            'submitted_at': submission.get('created_at', datetime.now().isoformat()),
            'bot_field': form_data.get('bot-field', '')  # Honeypot field
        }

    def _get_test_submission(self):
        """Generate a test submission for testing purposes"""
        return {
            'id': f'test-{datetime.now().strftime("%Y%m%d-%H%M%S")}',
            'title': 'Test Content Submission',
            'content_type': 'article',
            'author': 'Anonymous Contributor',
            'content': '# Test Article\n\nThis is a test article submitted via the form.\n\n## Features\n\n- Markdown support\n- Multiple sections\n- Code examples\n\n```python\nprint("Hello, World!")\n```',
            'tags': 'test, demo, markdown',
            'language': 'en',
            'content_rating': 'G',
            'notes': 'This is a test submission to verify the workflow.',
            'submitted_at': datetime.now().isoformat(),
            'bot_field': ''
        }

    def validate_submission(self, submission):
        """Validate the content submission"""
        errors = []
        
        # Check honeypot field
        if submission.get('bot_field'):
            errors.append("Bot field filled - likely spam")
            return errors
        
        # Required fields
        required_fields = ['title', 'content', 'content_type', 'language', 'content_rating']
        for field in required_fields:
            if not submission.get(field):
                errors.append(f"Missing required field: {field}")
        
        # Content length validation
        if submission.get('content'):
            content_length = len(submission['content'])
            if content_length > 10000:
                errors.append(f"Content too long: {content_length} characters (max: 10000)")
            elif content_length < 10:
                errors.append(f"Content too short: {content_length} characters (min: 10)")
        
        # Title length validation
        if submission.get('title'):
            title_length = len(submission['title'])
            if title_length > 200:
                errors.append(f"Title too long: {title_length} characters (max: 200)")
            elif title_length < 3:
                errors.append(f"Title too short: {title_length} characters (min: 3)")
        
        # Content type validation
        valid_types = list(self.content_type_mappings.keys())
        if submission.get('content_type') and submission['content_type'] not in valid_types:
            errors.append(f"Invalid content type: {submission['content_type']}. Valid types: {', '.join(valid_types)}")
        
        # Language validation
        valid_languages = list(self.language_mappings.keys())
        if submission.get('language') and submission['language'] not in valid_languages:
            errors.append(f"Invalid language: {submission['language']}. Valid languages: {', '.join(valid_languages)}")
        
        # Rating validation
        valid_ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17']
        if submission.get('content_rating') and submission['content_rating'] not in valid_ratings:
            errors.append(f"Invalid content rating: {submission['content_rating']}. Valid ratings: {', '.join(valid_ratings)}")
        
        return errors

    def sanitize_filename(self, filename):
        """Sanitize filename for safe file creation"""
        # Remove or replace unsafe characters
        sanitized = re.sub(r'[<>:"/\\|?*]', '_', filename)
        # Remove extra spaces and dashes
        sanitized = re.sub(r'[\s\-]+', '-', sanitized)
        # Remove leading/trailing dashes
        sanitized = sanitized.strip('-')
        return sanitized

    def create_content_file(self, submission):
        """Create the content file with proper front matter"""
        # Create filename
        date_str = datetime.now().strftime("%Y%m%d")
        title_slug = self.sanitize_filename(submission['title'].lower())
        filename = f"{date_str}-{title_slug}.md"
        
        # Parse tags
        tags = []
        if submission.get('tags'):
            tags = [tag.strip() for tag in submission['tags'].split(',') if tag.strip()]
        
        # Create front matter
        front_matter = {
            'title': submission['title'],
            'date': submission['submitted_at'],
            'draft': True,  # Always start as draft for review
            'type': submission['content_type'],
            'language': submission['language'],
            'rating': submission['content_rating'],
            'submission_id': submission['id'],
            'submitted_at': submission['submitted_at'],
            'author': submission['author'],
            'tags': tags
        }
        
        if submission.get('notes'):
            front_matter['notes'] = submission['notes']
        
        # Convert to YAML
        yaml_content = yaml.dump(front_matter, default_flow_style=False, allow_unicode=True)
        
        # Create file content
        file_content = f"---\n{yaml_content}---\n\n{submission['content']}\n"
        
        return filename, file_content

    def determine_target_path(self, submission):
        """Determine the target path for the content file"""
        language = self.language_mappings.get(submission['language'], 'other')
        content_type = self.content_type_mappings.get(submission['content_type'], 'misc')
        
        # Create directory structure
        target_dir = f"content/{language}/{content_type}"
        Path(target_dir).mkdir(parents=True, exist_ok=True)
        
        return target_dir

    def process_submission(self):
        """Main processing function"""
        print("🚀 Starting content submission processing...")
        
        # Get the latest submission
        submission = self.get_latest_submission()
        if not submission:
            print("❌ No submission to process")
            return False
        
        print(f"📝 Processing submission: {submission['title']}")
        
        # Validate submission
        errors = self.validate_submission(submission)
        if errors:
            print("❌ Validation errors:")
            for error in errors:
                print(f"   - {error}")
            return False
        
        print("✅ Submission validation passed")
        
        # Create content file
        filename, file_content = self.create_content_file(submission)
        target_dir = self.determine_target_path(submission)
        target_path = f"{target_dir}/{filename}"
        
        # Write file to repository
        full_path = Path(target_path)
        full_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(file_content)
        
        print(f"✅ Content file created: {target_path}")
        
        # Set output variables for GitHub Actions
        print(f"::set-output name=has_changes::true")
        print(f"::set-output name=submission_id::{submission['id']}")
        print(f"::set-output name=submission_title::{submission['title']}")
        print(f"::set-output name=content_type::{submission['content_type']}")
        print(f"::set-output name=language::{submission['language']}")
        print(f"::set-output name=rating::{submission['content_rating']}")
        print(f"::set-output name=tags::{', '.join([tag.strip() for tag in submission.get('tags', '').split(',') if tag.strip()])}")
        print(f"::set-output name=target_path::{target_path}")
        print(f"::set-output name=processed_at::{datetime.now().isoformat()}")
        print(f"::set-output name=submitted_at::{submission['submitted_at']}")
        print(f"::set-output name=content_length::{len(submission['content'])}")
        
        # Create content preview (first 200 characters)
        content_preview = submission['content'][:200] + "..." if len(submission['content']) > 200 else submission['content']
        print(f"::set-output name=content_preview::{content_preview}")
        
        print("🎉 Content submission processing completed successfully!")
        return True

def main():
    """Main entry point"""
    processor = ContentProcessor()
    
    try:
        success = processor.process_submission()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"❌ Error processing submission: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()