/**
 * Real GitHub Actions workflow trigger for content submission
 * This script sends repository dispatch events to trigger the create-content-branch.yml workflow
 */

class ContentWorkflowTrigger {
    constructor() {
        this.repository = 'pythonred4/CLMD_Content'; // Your repository
        this.workflowId = 'create-content-branch.yml';
        this.apiBase = 'https://api.github.com';
        this.token = null;
        this.isAuthenticated = false;
    }
    
    /**
     * Initialize the trigger with authentication
     * @param {string} token - GitHub personal access token
     */
    async initialize(token = null) {
        try {
            // Try to get token from various sources
            if (token) {
                this.token = token;
            } else if (window.GITHUB_TOKEN) {
                this.token = window.GITHUB_TOKEN;
            } else {
                // Try to get from localStorage or prompt user
                this.token = localStorage.getItem('github_token') || await this.promptForToken();
            }
            
            if (this.token) {
                this.isAuthenticated = true;
                localStorage.setItem('github_token', this.token);
                console.log('✅ GitHub authentication successful');
                return true;
            } else {
                throw new Error('No GitHub token provided');
            }
        } catch (error) {
            console.error('❌ GitHub authentication failed:', error);
            this.isAuthenticated = false;
            return false;
        }
    }
    
    /**
     * Prompt user for GitHub token
     */
    async promptForToken() {
        const token = prompt(
            'Enter your GitHub Personal Access Token:\n\n' +
            '1. Go to GitHub Settings > Developer settings > Personal access tokens\n' +
            '2. Generate new token with "repo" and "workflow" permissions\n' +
            '3. Copy and paste the token here\n\n' +
            'Note: This token will be stored locally for future use.'
        );
        return token ? token.trim() : null;
    }
    
    /**
     * Trigger the content branch creation workflow via repository dispatch
     * @param {Object} contentData - Content submission data
     */
    async triggerWorkflow(contentData) {
        try {
            if (!this.isAuthenticated) {
                const initialized = await this.initialize();
                if (!initialized) {
                    throw new Error('GitHub authentication required');
                }
            }
            
            console.log('🚀 Triggering GitHub Actions workflow...');
            console.log('Content data:', contentData);
            
            // Validate required data
            if (!contentData.content_type || !contentData.content_title) {
                throw new Error('Content type and title are required');
            }
            
            // Prepare the repository dispatch payload
            const payload = {
                event_type: 'create-content-branch',
                client_payload: {
                    content_type: contentData.content_type,
                    content_title: contentData.content_title,
                    content_summary: contentData.content_summary || '',
                    test_mode: contentData.test_mode || false,
                    submitted_at: new Date().toISOString(),
                    source: 'web-form',
                    user_agent: navigator.userAgent,
                    timestamp: Date.now()
                }
            };
            
            console.log('📤 Sending repository dispatch with payload:', payload);
            
            // Send repository dispatch event
            const response = await this.sendRepositoryDispatch(payload);
            
            if (response.success) {
                console.log('✅ Workflow triggered successfully!');
                console.log('🌿 Branch will be created with format: updatecontent-dd-mm-yyyy-hh-mm-ss');
                console.log('📁 Content file will be generated in appropriate folder');
                console.log('🔗 Pull request will be created for review');
                
                return {
                    success: true,
                    message: 'Content submitted successfully! Workflow triggered.',
                    workflow_triggered: true,
                    payload: payload,
                    response: response
                };
            } else {
                throw new Error(response.message || 'Failed to trigger workflow');
            }
            
        } catch (error) {
            console.error('❌ Error triggering workflow:', error);
            return {
                success: false,
                message: error.message,
                error: error,
                workflow_triggered: false
            };
        }
    }
    
    /**
     * Send repository dispatch event to GitHub
     * @param {Object} payload - The dispatch payload
     */
    async sendRepositoryDispatch(payload) {
        try {
            const [owner, repo] = this.repository.split('/');
            
            const response = await fetch(`${this.apiBase}/repos/${owner}/${repo}/dispatches`, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'ContentSubmissionHub/1.0'
                },
                body: JSON.stringify(payload)
            });
            
            console.log('📡 GitHub API response status:', response.status);
            
            if (response.ok) {
                return {
                    success: true,
                    message: 'Repository dispatch sent successfully',
                    status: response.status,
                    statusText: response.statusText
                };
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('GitHub API error:', errorData);
                
                return {
                    success: false,
                    message: `GitHub API error: ${response.status} ${response.statusText}`,
                    status: response.status,
                    statusText: response.statusText,
                    error: errorData
                };
            }
            
        } catch (error) {
            console.error('Network error:', error);
            return {
                success: false,
                message: `Network error: ${error.message}`,
                error: error
            };
        }
    }
    
    /**
     * Check workflow status
     * @param {string} workflowRunId - The workflow run ID
     */
    async checkWorkflowStatus(workflowRunId) {
        try {
            if (!this.isAuthenticated) {
                throw new Error('GitHub authentication required');
            }
            
            const [owner, repo] = this.repository.split('/');
            
            const response = await fetch(`${this.apiBase}/repos/${owner}/${repo}/actions/runs/${workflowRunId}`, {
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return {
                    success: true,
                    status: data.status,
                    conclusion: data.conclusion,
                    workflow_run: data
                };
            } else {
                throw new Error(`Failed to check workflow status: ${response.status}`);
            }
            
        } catch (error) {
            console.error('Error checking workflow status:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * Get recent workflow runs
     */
    async getRecentWorkflowRuns() {
        try {
            if (!this.isAuthenticated) {
                throw new Error('GitHub authentication required');
            }
            
            const [owner, repo] = this.repository.split('/');
            
            const response = await fetch(`${this.apiBase}/repos/${owner}/${repo}/actions/workflows/${this.workflowId}/runs?per_page=5`, {
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return {
                    success: true,
                    workflow_runs: data.workflow_runs || []
                };
            } else {
                throw new Error(`Failed to get workflow runs: ${response.status}`);
            }
            
        } catch (error) {
            console.error('Error getting workflow runs:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * Test the workflow trigger
     */
    async testWorkflow() {
        console.log('🧪 Testing workflow trigger...');
        
        const testData = {
            content_type: 'post-single',
            content_title: 'Test Content Submission',
            content_summary: 'This is a test submission to verify the workflow',
            test_mode: true
        };
        
        return await this.triggerWorkflow(testData);
    }
    
    /**
     * Get workflow information
     */
    getWorkflowInfo() {
        return {
            name: 'Create Content Update Branch and PR',
            file: this.workflowId,
            repository: this.repository,
            triggers: [
                'workflow_dispatch (manual)',
                'repository_dispatch (automated)'
            ],
            events: [
                'create-content-branch',
                'content-submission',
                'form-submission'
            ],
            api_endpoint: `${this.apiBase}/repos/${this.repository}/dispatches`,
            authentication_required: true
        };
    }
    
    /**
     * Clear stored token
     */
    clearToken() {
        this.token = null;
        this.isAuthenticated = false;
        localStorage.removeItem('github_token');
        console.log('🗑️ GitHub token cleared');
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentWorkflowTrigger;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.ContentWorkflowTrigger = ContentWorkflowTrigger;
    
    // Auto-initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', async () => {
        const trigger = new ContentWorkflowTrigger();
        window.contentWorkflowTrigger = trigger;
        
        console.log('🚀 Content Workflow Trigger initialized');
        console.log('Workflow info:', trigger.getWorkflowInfo());
        
        // Try to initialize with stored token
        const hasToken = localStorage.getItem('github_token');
        if (hasToken) {
            console.log('🔑 Found stored GitHub token, attempting authentication...');
            await trigger.initialize();
        } else {
            console.log('🔐 No GitHub token found. User will be prompted on first submission.');
            console.log('💡 To test manually: contentWorkflowTrigger.testWorkflow()');
        }
    });
}

// Example usage (for Node.js or direct execution)
if (typeof window === 'undefined') {
    const trigger = new ContentWorkflowTrigger();
    
    // Test the workflow (requires token)
    console.log('Node.js environment detected');
    console.log('To test, provide a GitHub token:');
    console.log('trigger.initialize("your_token_here").then(() => trigger.testWorkflow())');
}