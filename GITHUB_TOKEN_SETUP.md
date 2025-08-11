# 🔑 GitHub Personal Access Token Setup Guide

## 📋 Overview

To automatically trigger GitHub Actions workflows when submitting content through the web form, you need to provide a GitHub Personal Access Token. This token allows the web application to send repository dispatch events to your GitHub repository.

## ⚠️ Security Note

**Never share your token publicly!** This token gives access to your GitHub account and repositories. Store it securely and only use it on trusted websites.

## 🚀 Step-by-Step Setup

### **Step 1: Go to GitHub Settings**
1. Log in to your GitHub account
2. Click on your profile picture (top right)
3. Select **Settings**

### **Step 2: Access Developer Settings**
1. In the left sidebar, scroll down to **Developer settings**
2. Click on **Personal access tokens**
3. Select **Tokens (classic)**

### **Step 3: Generate New Token**
1. Click **Generate new token (classic)**
2. Give your token a descriptive name (e.g., "Content Submission Hub")
3. Set expiration (recommended: 90 days for security)

### **Step 4: Select Permissions**
**Required permissions:**
- ✅ **repo** (Full control of private repositories)
- ✅ **workflow** (Update GitHub Action workflows)

**Optional but recommended:**
- ✅ **read:org** (Read organization data)
- ✅ **read:user** (Read user profile data)

### **Step 5: Generate and Copy Token**
1. Scroll to the bottom and click **Generate token**
2. **IMPORTANT**: Copy the token immediately - you won't see it again!
3. Store it securely (password manager recommended)

## 🔧 Using the Token

### **Method 1: Automatic Prompt (Recommended)**
1. Submit content through the web form
2. When prompted, paste your GitHub token
3. Token will be stored locally for future use
4. No need to enter it again

### **Method 2: Manual Setup**
1. Open browser console (F12)
2. Run: `localStorage.setItem('github_token', 'your_token_here')`
3. Refresh the page
4. Token will be automatically loaded

### **Method 3: Environment Variable**
```javascript
// Set this before loading the page
window.GITHUB_TOKEN = 'your_token_here';
```

## 🧪 Testing the Setup

### **Test Workflow Trigger**
1. Open browser console (F12)
2. Run: `contentWorkflowTrigger.testWorkflow()`
3. Check console for success/error messages
4. Verify workflow appears in Actions tab

### **Test Form Submission**
1. Fill out the content submission form
2. Submit the form
3. Check console for workflow trigger status
4. Verify new branch and PR are created

## 🔍 Verification Steps

### **Check Workflow Execution**
1. Go to your repository on GitHub
2. Click **Actions** tab
3. Look for **"Create Content Update Branch and PR"** workflow
4. Verify it's running and completing successfully

### **Check Branch Creation**
1. Go to **Code** tab in your repository
2. Click on branch dropdown
3. Look for branches with format: `updatecontent-dd-mm-yyyy-hh-mm-ss`
4. Verify content files are created in correct folders

### **Check Pull Request**
1. Go to **Pull requests** tab
2. Look for PRs titled "Content Update: [Your Title]"
3. Verify content and metadata are correct
4. Review and merge when ready

## 🚨 Troubleshooting

### **Common Issues**

#### **"GitHub authentication required"**
- Token not provided or invalid
- Token expired
- Token doesn't have required permissions

#### **"GitHub API error: 403"**
- Token doesn't have repo access
- Repository is private and token lacks access
- Token expired

#### **"GitHub API error: 404"**
- Repository not found
- Incorrect repository name in configuration
- Token doesn't have access to repository

#### **Workflow not triggering**
- Check token permissions
- Verify repository dispatch event is sent
- Check workflow file syntax
- Verify workflow is enabled

### **Debug Steps**
1. **Check console logs** for detailed error messages
2. **Verify token permissions** in GitHub settings
3. **Test token manually** with GitHub API
4. **Check workflow file** for syntax errors
5. **Verify repository access** with token

## 🔄 Token Management

### **Regular Rotation**
- **Recommended**: Rotate tokens every 90 days
- **Security**: Delete old tokens when no longer needed
- **Monitoring**: Check token usage in GitHub settings

### **Revoking Access**
1. Go to **Settings > Developer settings > Personal access tokens**
2. Find your token
3. Click **Delete** to revoke access
4. Generate new token if needed

### **Multiple Tokens**
- Use different tokens for different purposes
- Label tokens clearly for easy identification
- Monitor usage and permissions for each token

## 📱 Mobile Considerations

### **Token Storage**
- Tokens are stored in browser localStorage
- Clearing browser data will remove stored tokens
- Mobile browsers may have different storage behavior

### **Security on Mobile**
- Avoid entering tokens on public/untrusted devices
- Use private/incognito mode when possible
- Clear tokens after use on shared devices

## 🔗 Related Resources

- [GitHub Personal Access Tokens Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Repository Dispatch API](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event)
- [GitHub Actions Workflows](https://docs.github.com/en/actions/using-workflows)
- [Content Submission Hub Repository](https://github.com/pythonred4/CLMD_Content)

## 💡 Pro Tips

1. **Use descriptive names** for your tokens
2. **Set reasonable expiration dates** for security
3. **Monitor token usage** regularly
4. **Store tokens securely** (password manager)
5. **Test workflow triggers** before production use
6. **Keep backup tokens** for critical operations
7. **Document token purposes** for team members

---

**Need Help?** Check the console logs, verify your token permissions, and ensure the workflow file is properly configured. The system will provide detailed error messages to help diagnose issues.