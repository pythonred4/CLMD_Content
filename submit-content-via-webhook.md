# 🌐 Webhook-Based Content Submission Setup

## 📋 Overview

Instead of requiring users to provide GitHub tokens, this system uses webhooks to automatically submit content and trigger GitHub Actions workflows. The `GITHUB_TOKEN` is automatically provided by GitHub Actions.

## 🔄 How It Works

### **Simple Flow:**
1. **User submits form** → Content sent to webhook endpoint
2. **Webhook creates file** → Adds content to `pending-content/` folder
3. **GitHub Actions triggers** → Automatically detects new files
4. **Workflow processes content** → Creates branches and pull requests
5. **No authentication needed** → Uses automatic `GITHUB_TOKEN`

## 🚀 Setup Options

### **Option 1: Netlify Forms (Recommended)**

#### **Setup Netlify Form:**
1. Deploy your site to Netlify
2. Add form handling in `submit-form.html`:

```html
<form name="content-submission" method="POST" data-netlify="true">
  <!-- Your existing form fields -->
  <input type="hidden" name="form-name" value="content-submission" />
</form>
```

#### **Netlify Webhook:**
1. Go to Netlify dashboard → Site settings → Build & deploy → Webhooks
2. Add webhook: `https://api.github.com/repos/pythonred4/CLMD_Content/dispatches`
3. Trigger: Form submissions
4. Headers: `Authorization: token $GITHUB_TOKEN`

### **Option 2: GitHub Pages + GitHub Actions**

#### **Create Submission Handler:**
1. Create `.github/workflows/handle-form-submission.yml`
2. Trigger on repository dispatch
3. Process form data and create content files

#### **Form Submission Script:**
```javascript
// Simple form submission that creates a file
async function submitContent(data) {
  const response = await fetch('/.netlify/functions/submit-content', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response.json();
}
```

### **Option 3: Direct GitHub API (Simplest)**

#### **Create Content File Directly:**
1. Form submission creates content file in `pending-content/` folder
2. Push to main branch triggers workflow automatically
3. No webhooks or external services needed

## 🔧 Implementation

### **Step 1: Update Form Handler**

Replace the complex token-based system with simple file creation:

```javascript
async submitContent(data) {
  // Create content file in pending-content folder
  const contentFile = this.createContentFile(data);
  
  // Commit and push to main branch
  await this.commitContentFile(contentFile);
  
  // Workflow will automatically trigger
  return { success: true, message: 'Content submitted successfully!' };
}
```

### **Step 2: Create Content File Structure**

```
pending-content/
├── video-single/
│   └── user-submission-1.md
├── post-single/
│   └── user-submission-2.md
├── posts/
│   └── user-submission-3.md
└── pages/
    └── user-submission-4.md
```

### **Step 3: Update Workflow Triggers**

The workflow now triggers on:
- **Push to main** (when content files are added)
- **Repository dispatch** (for manual triggers)
- **Workflow dispatch** (for testing)

## 📁 File Structure

### **Content File Format:**
```markdown
---
uid: auto-generated
title: "User's Content Title"
slug: "auto-generated-slug"
content_type: "post-single"
submitted_at: "2025-01-15T14:30:25Z"
status: "pending"
---

# User's Content

User's markdown content goes here...
```

### **Workflow Processing:**
1. **Detects new files** in `pending-content/` folders
2. **Creates timestamped branches** with format: `updatecontent-dd-mm-yyyy-hh-mm-ss`
3. **Moves content** to appropriate final folders
4. **Creates pull requests** for review
5. **Cleans up** pending content files

## 🎯 Benefits

### **✅ No User Authentication Required**
- Users don't need GitHub accounts
- No personal access tokens needed
- Works with automatic `GITHUB_TOKEN`

### **✅ Automatic Workflow Triggering**
- Workflows run automatically on file changes
- No manual intervention needed
- Uses GitHub's built-in automation

### **✅ Simple and Reliable**
- Fewer points of failure
- Standard GitHub workflow patterns
- Easy to debug and maintain

## 🚨 Security Considerations

### **Input Validation:**
- Validate all user inputs
- Sanitize markdown content
- Prevent script injection

### **Rate Limiting:**
- Limit submissions per user
- Implement cooldown periods
- Monitor for abuse

### **Content Review:**
- All content goes through pull request review
- No automatic merging
- Admin approval required

## 🔄 Workflow Steps

### **1. Content Detection:**
```yaml
- name: Check for new content
  run: |
    if [ -d "pending-content" ]; then
      echo "New content detected"
      find pending-content -name "*.md" -type f
    fi
```

### **2. Process Each Submission:**
```yaml
- name: Process content submissions
  run: |
    for file in pending-content/*/*.md; do
      if [ -f "$file" ]; then
        echo "Processing: $file"
        # Process content and create branch
      fi
    done
```

### **3. Cleanup:**
```yaml
- name: Cleanup pending content
  run: |
    git rm -r pending-content/
    git commit -m "Cleanup processed content submissions"
```

## 🧪 Testing

### **Test Form Submission:**
1. Submit content through web form
2. Verify file created in `pending-content/` folder
3. Check workflow automatically triggered
4. Verify branch and PR created

### **Test Workflow:**
1. Manually add file to `pending-content/` folder
2. Push to main branch
3. Verify workflow runs automatically
4. Check branch and PR creation

## 📚 Example Implementation

### **Simple Form Handler:**
```javascript
class SimpleContentHandler {
  async submitContent(data) {
    try {
      // Create content file
      const filename = this.generateFilename(data);
      const content = this.formatContent(data);
      
      // Add to pending-content folder
      await this.addPendingContent(filename, content);
      
      return { success: true, message: 'Content submitted!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  
  generateFilename(data) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const slug = data.title.toLowerCase().replace(/\s+/g, '-');
    return `${data.content_type}/${slug}-${timestamp}.md`;
  }
}
```

## 🔗 Related Files

- **`.github/workflows/create-content-branch.yml`** → Main workflow
- **`submit-form.html`** → User interface
- **`form-handler.js`** → Form processing
- **`pending-content/`** → Temporary content storage

## 💡 Next Steps

1. **Implement simple file creation** instead of complex API calls
2. **Update workflow** to trigger on file changes
3. **Test automatic triggering** with sample content
4. **Remove token-based authentication** requirements
5. **Simplify user experience** - no setup needed

---

**Result**: Users can submit content through the web form without any GitHub authentication, and the workflow will automatically trigger using the built-in `GITHUB_TOKEN`!