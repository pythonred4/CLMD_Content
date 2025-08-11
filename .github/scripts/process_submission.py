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
        """Create the content file with proper front matter matching existing structure"""
        # Generate a unique ID (similar to existing files)
        import random
        import string
        
        # Create a random ID like the existing files
        uid = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
        
        # Extract title from content if available
        title = submission.get('title', '')
        if not title:
            content_lines = submission.get('content', '').split('\n')
            for line in content_lines:
                if line.startswith('# '):
                    title = line[2:].strip()
                    break
            if not title:
                title = f"Content Submission - {datetime.now().strftime('%Y-%m-%d %H:%M')}"
        
        # Generate slug from title (similar to existing files)
        slug = self.sanitize_filename(title.lower())
        # Ensure slug is not too long and is unique
        if len(slug) > 50:
            slug = slug[:50]
        # Add random suffix to ensure uniqueness
        slug = f"{slug}-{uid[:4]}"
        
        # Create filename using the slug
        filename = f"{slug}.md"
        
        # Parse tags from summary if available
        tags = []
        if submission.get('summary'):
            # Extract potential tags from summary
            summary_words = submission['summary'].split()
            tags = [word.strip('.,!?') for word in summary_words if len(word) > 3][:5]  # Limit to 5 tags
        
        # Create front matter matching existing structure
        front_matter = {
            'uid': uid,
            'title': title,
            'slug': slug,
            'alias': '',
            'published_date': submission.get('submitted_at', datetime.now().isoformat()),
            'tags': ', '.join(tags) if tags else '',
            'draft': True,  # Always start as draft for review
            'discoverable': True,
            'is_page': submission.get('content_type') == 'pages',
            'canonical_url': '',
            'description': submission.get('summary', ''),
            'image': '',
            'lang': submission.get('language', 'vi'),
            'class_name': '',
            'first_published_at': submission.get('submitted_at', datetime.now().isoformat())
        }
        
        # Convert front matter to YAML
        yaml_content = yaml.dump(front_matter, default_flow_style=False, allow_unicode=True, sort_keys=False)
        
        # Create the full content
        full_content = f"---\n{yaml_content}---\n\n{submission['content']}"
        
        return filename, full_content

    def determine_target_path(self, submission):
        """Determine the target path for the content file based on content type"""
        content_type = submission.get('content_type', 'post-single')
        
        # Map content types to existing folder structures
        folder_mapping = {
            'video-single': 'Video-Single',
            'post-single': 'Post-Single',
            'posts': 'posts',
            'pages': 'pages'
        }
        
        # Get the target folder
        target_folder = folder_mapping.get(content_type, 'posts')
        
        # Create the full path
        target_path = f"{target_folder}"
        
        return target_path

    def process_submission(self):
        """Main processing function"""
        print("🚀 Starting content submission processing...")
        
        # Get the latest submission
        submission = self.get_latest_submission()
        if not submission:
            print("❌ No submission found to process")
            return False
        
        print(f"📝 Processing submission: {submission.get('id', 'unknown')}")
        
        # Validate the submission
        validation_errors = self.validate_submission(submission)
        if validation_errors:
            print(f"❌ Validation failed: {validation_errors}")
            return False
        
        print("✅ Submission validation passed")
        
        # Create the content file
        filename, content = self.create_content_file(submission)
        target_path = self.determine_target_path(submission)
        
        # Ensure the target directory exists
        full_target_dir = Path(target_path)
        full_target_dir.mkdir(parents=True, exist_ok=True)
        
        # Write the content file
        file_path = full_target_dir / filename
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Content file created: {file_path}")
        except Exception as e:
            print(f"❌ Error writing file: {e}")
            return False
        
        # Set GitHub Actions outputs for the workflow
        print("📤 Setting GitHub Actions outputs...")
        
        # Extract title from content if not set
        title = submission.get('title', '')
        if not title:
            content_lines = submission.get('content', '').split('\n')
            for line in content_lines:
                if line.startswith('# '):
                    title = line[2:].strip()
                    break
            if not title:
                title = f"Content Submission - {datetime.now().strftime('%Y-%m-%d %H:%M')}"
        
        # Set outputs for GitHub Actions
        print(f"::set-output name=has_changes::true")
        print(f"::set-output name=submission_id::{submission.get('id', 'unknown')}")
        print(f"::set-output name=submission_title::{title}")
        print(f"::set-output name=content_type::{submission.get('content_type', 'unknown')}")
        print(f"::set-output name=language::{submission.get('language', 'vi')}")
        print(f"::set_output name=rating::{submission.get('content_rating', 'G')}")
        print(f"::set-output name=target_path::{file_path}")
        print(f"::set-output name=processed_at::{datetime.now().isoformat()}")
        print(f"::set-output name=submitted_at::{submission.get('submitted_at', 'unknown')}")
        print(f"::set-output name=content_length::{len(submission.get('content', ''))}")
        
        # Create tags from summary
        tags = []
        if submission.get('summary'):
            summary_words = submission['summary'].split()
            tags = [word.strip('.,!?') for word in summary_words if len(word) > 3][:5]
        
        print(f"::set-output name=tags::{', '.join(tags) if tags else 'none'}")
        
        # Create content preview (first 200 characters)
        content_preview = submission.get('content', '')[:200]
        if len(submission.get('content', '')) > 200:
            content_preview += "..."
        print(f"::set-output name=content_preview::{content_preview}")
        
        print("✅ Content submission processed successfully!")
        print(f"📁 File created: {file_path}")
        print(f"📝 Title: {title}")
        print(f"🏷️ Type: {submission.get('content_type', 'unknown')}")
        
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