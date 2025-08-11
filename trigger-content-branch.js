/**
 * Helper script to trigger GitHub Actions workflow for content submission
 * This can be used to trigger the create-content-branch.yml workflow
 */

class ContentWorkflowTrigger {
    constructor() {
        this.repository = 'pythonred4/CLMD_Content'; // Change to your repo
        this.workflowId = 'create-content-branch.yml';
        this.token = null; // Will be set when needed
    }
    
    /**
     * Trigger the content branch creation workflow
     * @param {Object} contentData - Content submission data
     * @param {string} contentData.content_type - Type of content
     * @param {string} contentData.content_title - Title of content
     * @param {string} contentData.content_summary - Optional summary
     * @param {boolean} contentData.test_mode - Whether this is test content
     */
    async triggerWorkflow(contentData) {
        try {
            console.log('Triggering content branch creation workflow...');
            
            // Validate required data
            if (!contentData.content_type || !contentData.content_title) {
                throw new Error('Content type and title are required');
            }
            
            // Prepare the payload
            const payload = {
                event_type: 'create-content-branch',
                client_payload: {
                    content_type: contentData.content_type,
                    content_title: contentData.content_title,
                    content_summary: contentData.content_summary || '',
                    test_mode: contentData.test_mode || false,
                    submitted_at: new Date().toISOString(),
                    source: 'web-form'
                }
            };
            
            console.log('Workflow payload:', payload);
            
            // In a real implementation, this would send a repository dispatch event
            // For now, we'll simulate the workflow trigger
            await this.simulateWorkflowTrigger(payload);
            
            return {
                success: true,
                message: 'Workflow triggered successfully',
                payload: payload
            };
            
        } catch (error) {
            console.error('Error triggering workflow:', error);
            return {
                success: false,
                message: error.message,
                error: error
            };
        }
    }
    
    /**
     * Simulate workflow trigger (for demo purposes)
     * In production, this would send a real repository dispatch event
     */
    async simulateWorkflowTrigger(payload) {
        console.log('Simulating workflow trigger...');
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('✅ Workflow would be triggered with payload:', payload);
        console.log('🌿 Branch would be created with format: updatecontent-dd-mm-yyyy-hh-mm-ss');
        console.log('📁 Content file would be created in appropriate folder');
        console.log('🔗 Pull Request would be created for review');
        
        // Show what would happen
        const branchName = this.generateBranchName();
        console.log(`📋 Example branch name: ${branchName}`);
        
        return {
            simulated: true,
            branch_name: branchName,
            workflow_file: this.workflowId,
            repository: this.repository
        };
    }
    
    /**
     * Generate a sample branch name for demonstration
     */
    generateBranchName() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        return `updatecontent-${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;
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
            ]
        };
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
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentWorkflowTrigger;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.ContentWorkflowTrigger = ContentWorkflowTrigger;
    
    // Auto-initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        const trigger = new ContentWorkflowTrigger();
        window.contentWorkflowTrigger = trigger;
        
        console.log('Content Workflow Trigger initialized');
        console.log('Workflow info:', trigger.getWorkflowInfo());
        console.log('Test the workflow with: contentWorkflowTrigger.testWorkflow()');
    });
}

// Example usage (for Node.js or direct execution)
if (typeof window === 'undefined') {
    const trigger = new ContentWorkflowTrigger();
    
    // Test the workflow
    trigger.testWorkflow().then(result => {
        console.log('Test result:', result);
    });
}