/**
 * Form Handler for Content Submission System
 * Handles form submission and integration with GitHub Actions workflow
 */

class ContentSubmissionHandler {
    constructor() {
        this.form = null;
        this.submitButton = null;
        this.loadingElement = null;
        this.statusElement = null;
        this.previewElement = null;
        this.previewContent = null;
        
        this.init();
    }
    
    init() {
        this.form = document.getElementById('contentForm');
        this.submitButton = document.getElementById('submitBtn');
        this.loadingElement = document.getElementById('loading');
        this.statusElement = document.getElementById('statusMessage');
        this.previewElement = document.getElementById('markdownPreview');
        this.previewContent = document.getElementById('previewContent');
        
        if (this.form) {
            this.setupEventListeners();
        }
    }
    
    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Markdown preview
        const previewToggle = document.querySelector('.preview-toggle');
        if (previewToggle) {
            previewToggle.addEventListener('click', () => this.togglePreview());
        }
        
        // Content field focus for placeholder
        const contentField = document.getElementById('content');
        if (contentField) {
            contentField.addEventListener('focus', () => this.setContentPlaceholder());
        }
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        
        // Validate form
        if (!this.validateForm()) {
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Get form data
            const formData = this.getFormData();
            
            // Submit content
            await this.submitContent(formData);
            
            // Show success message
            this.showStatus('✅ Nội dung đã được gửi thành công! Một Pull Request sẽ được tạo tự động trên GitHub.', 'success');
            
            // Reset form
            this.form.reset();
            
        } catch (error) {
            console.error('Submission error:', error);
            this.showStatus('❌ Có lỗi xảy ra khi gửi nội dung. Vui lòng thử lại.', 'error');
        } finally {
            // Hide loading state
            this.setLoadingState(false);
        }
    }
    
    validateForm() {
        const contentType = this.form.querySelector('#contentType').value;
        const content = this.form.querySelector('#content').value;
        
        if (!contentType) {
            this.showStatus('Vui lòng chọn loại nội dung.', 'error');
            return false;
        }
        
        if (!content.trim()) {
            this.showStatus('Vui lòng nhập nội dung.', 'error');
            return false;
        }
        
        if (content.length < 10) {
            this.showStatus('Nội dung quá ngắn. Vui lòng nhập ít nhất 10 ký tự.', 'error');
            return false;
        }
        
        if (content.length > 50000) {
            this.showStatus('Nội dung quá dài. Vui lòng giảm xuống dưới 50,000 ký tự.', 'error');
            return false;
        }
        
        return true;
    }
    
    getFormData() {
        const formData = new FormData(this.form);
        
        return {
            'content-type': formData.get('contentType'),
            'summary': formData.get('summary'),
            'content': formData.get('content'),
            'bot-field': '', // Honeypot field
            'timestamp': new Date().toISOString(),
            'user-agent': navigator.userAgent,
            'submission-id': this.generateSubmissionId()
        };
    }
    
    generateSubmissionId() {
        return 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    async submitContent(data) {
        // In a real implementation, this would send to your backend or Netlify
        // For now, we'll simulate the submission process
        
        console.log('Submitting content:', data);
        
        // Simulate API call delay
        await this.delay(2000);
        
        // Simulate different submission methods based on configuration
        const submissionMethod = this.getSubmissionMethod();
        
        switch (submissionMethod) {
            case 'github-api':
                return await this.submitViaGitHubAPI(data);
            case 'netlify':
                return await this.submitViaNetlify(data);
            case 'webhook':
                return await this.submitViaWebhook(data);
            default:
                return await this.simulateSubmission(data);
        }
    }
    
    getSubmissionMethod() {
        // This could be configured via environment variables or config file
        // For now, return 'simulate' for demo purposes
        return 'simulate';
    }
    
    async submitViaGitHubAPI(data) {
        // Direct GitHub API submission (requires authentication)
        console.log('Submitting via GitHub API...');
        
        // This would require GitHub token and proper authentication
        // Implementation depends on your setup
        
        throw new Error('GitHub API submission not implemented in demo');
    }
    
    async submitViaNetlify(data) {
        // Netlify form submission
        console.log('Submitting via Netlify...');
        
        // This would send to Netlify form endpoint
        // Netlify would then trigger GitHub Actions via webhook
        
        throw new Error('Netlify submission not implemented in demo');
    }
    
    async submitViaWebhook(data) {
        // Webhook submission to trigger GitHub Actions
        console.log('Submitting via webhook...');
        
        // This would send to your webhook endpoint
        // Which would then trigger the GitHub Actions workflow
        
        throw new Error('Webhook submission not implemented in demo');
    }
    
    async simulateSubmission(data) {
        // Simulate the submission process for demo purposes
        console.log('Simulating submission process...');
        
        // Show what would happen in a real implementation
        const folderMap = {
            'video-single': 'Video-Single/',
            'post-single': 'Post-Single/',
            'posts': 'posts/',
            'pages': 'pages/'
        };
        
        const targetFolder = folderMap[data['content-type']];
        console.log(`File would be placed in: ${targetFolder}`);
        console.log('GitHub Actions workflow would be triggered to create Pull Request');
        
        // Simulate successful submission
        return { success: true, message: 'Content submitted successfully' };
    }
    
    togglePreview() {
        const content = document.getElementById('content').value;
        const previewToggle = document.querySelector('.preview-toggle');
        
        if (this.previewElement.style.display === 'none' || this.previewElement.style.display === '') {
            // Show preview
            if (typeof marked !== 'undefined') {
                this.previewContent.innerHTML = marked.parse(content);
            } else {
                this.previewContent.innerHTML = `<pre>${this.escapeHtml(content)}</pre>`;
            }
            this.previewElement.style.display = 'block';
            previewToggle.textContent = '👁️ Ẩn Xem Trước';
        } else {
            // Hide preview
            this.previewElement.style.display = 'none';
            previewToggle.textContent = '👁️ Xem Trước Markdown';
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    setContentPlaceholder() {
        const contentField = document.getElementById('content');
        if (!contentField.value) {
            contentField.placeholder = `# Tiêu Đề Bài Viết

## Mô Tả

Viết nội dung của bạn ở đây...

## Ví Dụ Code

\`\`\`python
print("Xin chào, Thế giới!")
\`\`\`

## Kết Luận

Kết thúc bài viết của bạn...`;
        }
    }
    
    setLoadingState(loading) {
        if (loading) {
            this.submitButton.disabled = true;
            this.loadingElement.style.display = 'block';
            this.statusElement.style.display = 'none';
        } else {
            this.submitButton.disabled = false;
            this.loadingElement.style.display = 'none';
        }
    }
    
    showStatus(message, type) {
        this.statusElement.textContent = message;
        this.statusElement.className = `status-message ${type}`;
        this.statusElement.style.display = 'block';
        
        // Auto-hide success messages after 10 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.statusElement.style.display = 'none';
            }, 10000);
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Utility method to test the system
    async testSubmission(contentType = 'post-single', content = '# Test Content\n\nThis is test content.') {
        console.log('Testing submission...');
        
        const testData = {
            'content-type': contentType,
            'summary': 'Test content for system testing',
            'content': content,
            'bot-field': '',
            'timestamp': new Date().toISOString(),
            'submission-id': 'test_' + Date.now()
        };
        
        try {
            await this.submitContent(testData);
            console.log('Test submission successful');
        } catch (error) {
            console.error('Test submission failed:', error);
        }
    }
}

// Configuration object for the form handler
const FormConfig = {
    // Submission method: 'github-api', 'netlify', 'webhook', or 'simulate'
    submissionMethod: 'simulate',
    
    // GitHub repository information (if using GitHub API)
    github: {
        owner: 'your-username',
        repo: 'your-repo',
        branch: 'main',
        workflowId: 'process-content-submissions.yml'
    },
    
    // Netlify configuration (if using Netlify)
    netlify: {
        siteId: 'your-site-id',
        formName: 'content-submission'
    },
    
    // Webhook configuration (if using webhook)
    webhook: {
        url: 'https://your-webhook-endpoint.com/submit',
        secret: 'your-webhook-secret'
    },
    
    // Content validation rules
    validation: {
        minContentLength: 10,
        maxContentLength: 50000,
        allowedContentTypes: ['video-single', 'post-single', 'posts', 'pages']
    }
};

// Initialize the form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const formHandler = new ContentSubmissionHandler();
    
    // Make it available globally for testing
    window.formHandler = formHandler;
    window.FormConfig = FormConfig;
    
    console.log('Content submission form handler initialized');
    console.log('Configuration:', FormConfig);
    console.log('Test the system with: formHandler.testSubmission()');
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ContentSubmissionHandler, FormConfig };
}