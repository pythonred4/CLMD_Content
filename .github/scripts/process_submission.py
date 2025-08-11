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
            'video-single': 'videos',
            'post-single': 'posts',
            'posts': 'posts',
            'pages': 'pages'
        }
        
        # Language mappings - default to Vietnamese since form is in Vietnamese
        self.language_mappings = {
            'vi': 'vietnamese',
            'en': 'english',
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
            'content_type': form_data.get('content-type', '').strip(),
            'summary': form_data.get('summary', '').strip(),
            'content': form_data.get('content', '').strip(),
            'submitted_at': submission.get('created_at', datetime.now().isoformat()),
            'bot_field': form_data.get('bot-field', '')  # Honeypot field
        }

    def _get_test_submission(self):
        """Generate a test submission for testing purposes"""
        # Check if we have manual test inputs from workflow dispatch
        test_content = os.getenv('TEST_CONTENT', '')
        test_content_type = os.getenv('TEST_CONTENT_TYPE', 'post-single')
        
        if test_content:
            return {
                'id': f'test-{datetime.now().strftime("%Y%m%d-%H%M%S")}',
                'content_type': test_content_type,
                'summary': 'Test content from manual workflow dispatch',
                'content': test_content,
                'submitted_at': datetime.now().isoformat(),
                'bot_field': ''
            }
        else:
            # Default test submission
            return {
                'id': f'test-{datetime.now().strftime("%Y%m%d-%H%M%S")}',
                'content_type': 'post-single',
                'summary': 'Bài viết test để kiểm tra workflow gửi nội dung',
                'content': '# Bài Viết Test\n\nĐây là bài viết test được gửi qua form.\n\n## Tính Năng\n\n- Hỗ trợ Markdown\n- Nhiều phần khác nhau\n- Ví dụ code\n\n```python\nprint("Xin chào, Thế giới!")\n```\n\n## Kết Luận\n\nForm hoạt động tốt!',
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
        
        # Required fields - only content-type and content are required
        required_fields = ['content_type', 'content']
        for field in required_fields:
            if not submission.get(field):
                errors.append(f"Missing required field: {field}")
        
        # Content length validation
        if submission.get('content'):
            content_length = len(submission['content'])
            if content_length > 50000:  # Increased limit for markdown content
                errors.append(f"Content too long: {content_length} characters (max: 50000)")
            elif content_length < 10:
                errors.append(f"Content too short: {content_length} characters (min: 10)")
        
        # Content type validation
        valid_types = list(self.content_type_mappings.keys())
        if submission.get('content_type') and submission['content_type'] not in valid_types:
            errors.append(f"Invalid content type: {submission['content_type']}. Valid types: {', '.join(valid_types)}")
        
        # Set default values for missing optional fields
        if not submission.get('language'):
            submission['language'] = 'vi'  # Default to Vietnamese
        if not submission.get('content_rating'):
            submission['content_rating'] = 'G'  # Default to General
        if not submission.get('title'):
            # Extract title from content if available
            content_lines = submission.get('content', '').split('\n')
            for line in content_lines:
                if line.startswith('# '):
                    submission['title'] = line[2:].strip()
                    break
            if not submission.get('title'):
                submission['title'] = f"Content Submission - {datetime.now().strftime('%Y-%m-%d %H:%M')}"
        
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
        
        # Parse tags from summary if available
        tags = []
        if submission.get('summary'):
            # Extract potential tags from summary
            summary_words = submission['summary'].split()
            tags = [word.strip('.,!?') for word in summary_words if len(word) > 3][:5]  # Limit to 5 tags
        
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
            'author': 'Anonymous Contributor',
            'tags': tags
        }
        
        # Add summary if available
        if submission.get('summary'):
            front_matter['summary'] = submission['summary']
        
        # Convert front matter to YAML
        yaml_content = yaml.dump(front_matter, default_flow_style=False, allow_unicode=True, sort_keys=False)
        
        # Create the full content
        full_content = f"---\n{yaml_content}---\n\n{submission['content']}"
        
        return filename, full_content

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