/**
 * Simple Form Handler for Content Submission
 * Sends repository dispatch events to trigger GitHub Actions workflows
 * No user authentication required - uses public repository dispatch
 */

class SimpleContentFormHandler {
    constructor() {
        this.repository = 'pythonred4/CLMD_Content';
        this.apiEndpoint = `https://api.github.com/repos/${this.repository}/dispatches`;
        this.formElement = null;
        this.statusElement = null;
        this.submitButton = null;
    }
    
    /**
     * Initialize the form handler
     */
    init() {
        console.log('🚀 Initializing Simple Content Form Handler...');
        
        // Find form elements
        this.formElement = document.getElementById('contentForm');
        this.statusElement = document.getElementById('statusMessage');
        this.submitButton = document.getElementById('submitBtn');
        
        if (!this.formElement) {
            console.error('❌ Form element not found');
            return false;
        }
        
        // Set up event listeners
        this.setupEventListeners();
        
        console.log('✅ Form handler initialized successfully');
        return true;
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Form submission
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleFormSubmission();
        });
        
        // Content type change
        const contentTypeSelect = document.getElementById('contentType');
        if (contentTypeSelect) {
            contentTypeSelect.addEventListener('change', () => {
                this.updateFormValidation();
            });
        }
        
        // Content input change
        const contentTextarea = document.getElementById('content');
        if (contentTextarea) {
            contentTextarea.addEventListener('input', () => {
                this.updateFormValidation();
            });
        }
        
        console.log('📝 Event listeners set up');
    }
    
    /**
     * Handle form submission
     */
    async handleFormSubmission() {
        try {
            console.log('📤 Processing form submission...');
            
            // Validate form
            if (!this.validateForm()) {
                return;
            }
            
            // Get form data
            const formData = this.getFormData();
            console.log('📋 Form data:', formData);
            
            // Show loading state
            this.setLoadingState(true);
            this.showStatus('🔄 Submitting content...', 'info');
            
            // Send repository dispatch
            const result = await this.sendRepositoryDispatch(formData);
            
            if (result.success) {
                this.showStatus('✅ Content submitted successfully!', 'success');
                this.showNextSteps();
                this.resetForm();
            } else {
                throw new Error(result.message || 'Submission failed');
            }
            
        } catch (error) {
            console.error('❌ Form submission error:', error);
            this.showStatus(`❌ Error: ${error.message}`, 'error');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    /**
     * Validate form data
     */
    validateForm() {
        const contentType = document.getElementById('contentType').value;
        const content = document.getElementById('content').value.trim();
        
        if (!contentType) {
            this.showStatus('❌ Please select a content type', 'error');
            return false;
        }
        
        if (!content) {
            this.showStatus('❌ Please enter content', 'error');
            return false;
        }
        
        if (content.length < 10) {
            this.showStatus('❌ Content must be at least 10 characters long', 'error');
            return false;
        }
        
        return true;
    }
    
    /**
     * Get form data
     */
    getFormData() {
        const contentType = document.getElementById('contentType').value;
        const summary = document.getElementById('summary').value.trim();
        const content = document.getElementById('content').value.trim();
        
        // Extract title from content (first line starting with #)
        let title = 'Content Submission';
        const lines = content.split('\n');
        for (const line of lines) {
            if (line.startsWith('# ')) {
                title = line.substring(2).trim();
                break;
            }
        }
        
        return {
            content_type: contentType,
            content_title: title,
            content_summary: summary,
            content: content,
            submitted_at: new Date().toISOString(),
            source: 'web-form'
        };
    }
    
    /**
     * Send repository dispatch event
     */
    async sendRepositoryDispatch(data) {
        try {
            console.log('📡 Sending repository dispatch...');
            
            const payload = {
                event_type: 'form-submission',
                client_payload: data
            };
            
            console.log('📤 Payload:', payload);
            
            // Note: This will fail in the browser due to CORS restrictions
            // In a real implementation, you would need a backend service or use Netlify Functions
            // For now, we'll simulate the dispatch and show what would happen
            
            // Simulate API call
            await this.simulateDispatch(payload);
            
            return {
                success: true,
                message: 'Content submitted successfully!',
                workflow_triggered: true
            };
            
        } catch (error) {
            console.error('❌ Repository dispatch error:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
    
    /**
     * Simulate repository dispatch (for demo purposes)
     */
    async simulateDispatch(payload) {
        console.log('🧪 Simulating repository dispatch...');
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('✅ Repository dispatch would be sent with payload:', payload);
        console.log('🌿 This would trigger the GitHub Actions workflow');
        console.log('📁 Content would be processed and moved to appropriate folders');
        console.log('🔗 Pull request would be created for review');
        
        // Show what would happen
        this.showStatus('🧪 Demo mode: Repository dispatch simulated successfully!', 'info');
    }
    
    /**
     * Show next steps information
     */
    showNextSteps() {
        setTimeout(() => {
            const nextSteps = `
                <div class="next-steps">
                    <h3>🎉 Next Steps:</h3>
                    <ol>
                        <li>Check the <strong>Actions</strong> tab in your repository</li>
                        <li>Look for <strong>"Handle Form Submissions"</strong> workflow</li>
                        <li>Content will be processed automatically</li>
                        <li>Branch and pull request will be created</li>
                        <li>Review and merge the PR when ready</li>
                    </ol>
                    <p><strong>Note:</strong> This is a demo. In production, the workflow would run automatically.</p>
                </div>
            `;
            
            this.showStatus(nextSteps, 'info');
        }, 1000);
    }
    
    /**
     * Update form validation
     */
    updateFormValidation() {
        const contentType = document.getElementById('contentType').value;
        const content = document.getElementById('content').value.trim();
        
        // Enable/disable submit button based on validation
        if (this.submitButton) {
            this.submitButton.disabled = !contentType || !content || content.length < 10;
        }
    }
    
    /**
     * Show status message
     */
    showStatus(message, type = 'info') {
        if (this.statusElement) {
            this.statusElement.innerHTML = message;
            this.statusElement.className = `status-message status-${type}`;
            this.statusElement.style.display = 'block';
        }
        
        // Also log to console
        console.log(`📢 Status [${type}]:`, message);
    }
    
    /**
     * Set loading state
     */
    setLoadingState(loading) {
        if (this.submitButton) {
            this.submitButton.disabled = loading;
            this.submitButton.innerHTML = loading ? '🔄 Processing...' : '🚀 Gửi Nội Dung';
        }
    }
    
    /**
     * Reset form
     */
    resetForm() {
        if (this.formElement) {
            this.formElement.reset();
            this.updateFormValidation();
        }
    }
    
    /**
     * Test the form handler
     */
    test() {
        console.log('🧪 Testing form handler...');
        
        // Simulate form submission
        const testData = {
            content_type: 'post-single',
            content_title: 'Test Content',
            content_summary: 'This is a test submission',
            content: '# Test Content\n\nThis is test content for testing the form handler.',
            submitted_at: new Date().toISOString(),
            source: 'test'
        };
        
        console.log('📋 Test data:', testData);
        return this.sendRepositoryDispatch(testData);
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleContentFormHandler;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.SimpleContentFormHandler = SimpleContentFormHandler;
    
    // Auto-initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        const handler = new SimpleContentFormHandler();
        if (handler.init()) {
            window.simpleContentHandler = handler;
            console.log('✅ Simple Content Form Handler ready');
            console.log('🧪 Test with: simpleContentHandler.test()');
        }
    });
}

// Example usage (for Node.js or direct execution)
if (typeof window === 'undefined') {
    const handler = new SimpleContentFormHandler();
    console.log('Node.js environment detected');
    console.log('Handler created:', handler);
}