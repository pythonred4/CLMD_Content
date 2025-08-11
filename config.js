/**
 * Configuration file for Content Submission System
 * Customize these settings according to your needs
 */

const ContentSubmissionConfig = {
    // ========================================
    // BASIC SETTINGS
    // ========================================
    
    // Site information
    site: {
        name: "Trang Web Tĩnh",
        description: "Hệ thống gửi nội dung tự động",
        language: "vi", // vi, en, my, th, other
        timezone: "Asia/Ho_Chi_Minh"
    },
    
    // ========================================
    // SUBMISSION SETTINGS
    // ========================================
    
    // Content types and their folder mappings
    contentTypes: {
        'video-single': {
            label: 'Video-Single',
            folder: 'Video-Single/',
            description: 'Nội dung video đơn lẻ',
            maxContentLength: 100000,
            allowedExtensions: ['.md', '.markdown']
        },
        'post-single': {
            label: 'Post-Single',
            folder: 'Post-Single/',
            description: 'Bài viết đơn lẻ',
            maxContentLength: 50000,
            allowedExtensions: ['.md', '.markdown']
        },
        'posts': {
            label: 'Posts',
            folder: 'posts/',
            description: 'Tập hợp các bài viết',
            maxContentLength: 30000,
            allowedExtensions: ['.md', '.markdown']
        },
        'pages': {
            label: 'Pages',
            folder: 'pages/',
            description: 'Trang tĩnh',
            maxContentLength: 20000,
            allowedExtensions: ['.md', '.markdown']
        }
    },
    
    // Validation rules
    validation: {
        minContentLength: 10,
        maxContentLength: 100000,
        minTitleLength: 3,
        maxTitleLength: 200,
        requiredFields: ['content-type', 'content'],
        forbiddenWords: [], // Add words that should not appear in content
        maxTags: 10,
        maxSummaryLength: 500
    },
    
    // ========================================
    // INTEGRATION SETTINGS
    // ========================================
    
    // Submission method: 'github-api', 'netlify', 'webhook', 'simulate'
    submissionMethod: 'simulate',
    
    // GitHub configuration
    github: {
        owner: 'your-username',
        repo: 'your-repo',
        branch: 'main',
        workflowId: 'process-content-submissions.yml',
        workflowName: 'Process Content Submissions',
        autoCreatePR: true,
        prTemplate: 'content-submission-template.md'
    },
    
    // Netlify configuration (if using Netlify forms)
    netlify: {
        siteId: 'your-site-id',
        formName: 'content-submission',
        webhookUrl: 'https://your-webhook-endpoint.com/submit',
        webhookSecret: 'your-webhook-secret'
    },
    
    // Webhook configuration (if using custom webhook)
    webhook: {
        url: 'https://your-webhook-endpoint.com/submit',
        secret: 'your-webhook-secret',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'ContentSubmissionSystem/1.0'
        }
    },
    
    // ========================================
    // YAML HEADER SETTINGS
    // ========================================
    
    // Default YAML header fields
    defaultYamlFields: {
        draft: true,
        discoverable: true,
        lang: 'vi',
        class_name: '',
        canonical_url: '',
        image: ''
    },
    
    // YAML field mappings (how form fields map to YAML fields)
    yamlFieldMappings: {
        'content-type': 'content_type',
        'summary': 'description',
        'content': 'content',
        'title': 'title',
        'tags': 'tags'
    },
    
    // ========================================
    // UI SETTINGS
    // ========================================
    
    // Form appearance
    ui: {
        theme: 'default', // default, dark, light, custom
        primaryColor: '#4facfe',
        secondaryColor: '#00f2fe',
        borderRadius: '10px',
        showPreview: true,
        showExamples: true,
        autoSave: false,
        autoSaveInterval: 30000 // 30 seconds
    },
    
    // Messages and labels
    messages: {
        vi: {
            submitSuccess: '✅ Nội dung đã được gửi thành công! Một Pull Request sẽ được tạo tự động trên GitHub.',
            submitError: '❌ Có lỗi xảy ra khi gửi nội dung. Vui lòng thử lại.',
            validationError: 'Vui lòng kiểm tra lại thông tin đã nhập.',
            loading: 'Đang xử lý yêu cầu của bạn...',
            preview: 'Xem Trước Markdown',
            hidePreview: 'Ẩn Xem Trước'
        },
        en: {
            submitSuccess: '✅ Content submitted successfully! A Pull Request will be created automatically on GitHub.',
            submitError: '❌ An error occurred while submitting content. Please try again.',
            validationError: 'Please check the information you entered.',
            loading: 'Processing your request...',
            preview: 'Preview Markdown',
            hidePreview: 'Hide Preview'
        }
    },
    
    // ========================================
    // SECURITY SETTINGS
    // ========================================
    
    security: {
        enableHoneypot: true,
        honeypotField: 'bot-field',
        rateLimit: {
            enabled: true,
            maxSubmissions: 5,
            timeWindow: 3600000 // 1 hour in milliseconds
        },
        contentFiltering: {
            enabled: true,
            blockScripts: true,
            blockIframes: true,
            sanitizeHtml: true
        }
    },
    
    // ========================================
    // NOTIFICATION SETTINGS
    // ========================================
    
    notifications: {
        email: {
            enabled: false,
            smtp: {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'your-email@gmail.com',
                    pass: 'your-app-password'
                }
            },
            recipients: ['admin@example.com']
        },
        slack: {
            enabled: false,
            webhookUrl: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK',
            channel: '#content-submissions'
        },
        discord: {
            enabled: false,
            webhookUrl: 'https://discord.com/api/webhooks/YOUR/WEBHOOK/URL'
        }
    },
    
    // ========================================
    // ADVANCED SETTINGS
    // ========================================
    
    // File naming conventions
    fileNaming: {
        useSlug: true,
        useTimestamp: false,
        useRandomId: true,
        randomIdLength: 8,
        separator: '-',
        maxLength: 100
    },
    
    // Content processing
    contentProcessing: {
        autoGenerateSlug: true,
        autoExtractTags: true,
        autoExtractTitle: true,
        normalizeContent: true,
        removeExtraSpaces: true,
        fixMarkdown: true
    },
    
    // Debug and logging
    debug: {
        enabled: false,
        logLevel: 'info', // debug, info, warn, error
        logToConsole: true,
        logToFile: false,
        logFilePath: './logs/content-submission.log'
    }
};

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentSubmissionConfig;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.ContentSubmissionConfig = ContentSubmissionConfig;
}

// Configuration validation
function validateConfig() {
    const errors = [];
    
    // Check required fields
    if (!ContentSubmissionConfig.github.owner || ContentSubmissionConfig.github.owner === 'your-username') {
        errors.push('GitHub owner not configured');
    }
    
    if (!ContentSubmissionConfig.github.repo || ContentSubmissionConfig.github.repo === 'your-repo') {
        errors.push('GitHub repository not configured');
    }
    
    // Check content types
    if (Object.keys(ContentSubmissionConfig.contentTypes).length === 0) {
        errors.push('No content types configured');
    }
    
    // Check submission method
    const validMethods = ['github-api', 'netlify', 'webhook', 'simulate'];
    if (!validMethods.includes(ContentSubmissionConfig.submissionMethod)) {
        errors.push(`Invalid submission method: ${ContentSubmissionConfig.submissionMethod}`);
    }
    
    if (errors.length > 0) {
        console.warn('Configuration validation errors:', errors);
        return false;
    }
    
    return true;
}

// Auto-validate on load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        if (!validateConfig()) {
            console.warn('Content submission system may not work properly due to configuration issues.');
        }
    });
}