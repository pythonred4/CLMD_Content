# 🚀 GitHub Actions Workflow Setup Guide

## 📋 Overview

This guide explains how to set up and use the GitHub Actions workflow that automatically creates content update branches and pull requests when users submit content through the web form.

## 🔧 Workflow Files

### 1. **create-content-branch.yml**
- **Location**: `.github/workflows/create-content-branch.yml`
- **Purpose**: Creates branches and PRs for content submissions
- **Triggers**: Manual dispatch + Repository dispatch events

### 2. **dispatch-update.yml** (Existing)
- **Location**: `.github/workflows/dispatch-update.yml`
- **Purpose**: Syncs content to Hugo repository after merge
- **Triggers**: Push to main branch

## 🎯 How It Works

```
User submits form → Workflow triggered → Branch created → PR created → Admin reviews → Merge → Hugo sync
```

## 📝 Workflow Features

- ✅ **Automatic branch creation** with timestamp format
- ✅ **Content file generation** with YAML front matter
- ✅ **Pull request creation** (no auto-merge)
- ✅ **Uses GITHUB_TOKEN** (no configuration needed)
- ✅ **Handles both manual and automated triggers**

## 🔄 Trigger Methods

### **Method 1: Manual Trigger (workflow_dispatch)**
1. Go to **Actions** tab in your repository
2. Find **"Create Content Update Branch and PR"**
3. Click **"Run workflow"**
4. Fill in the inputs and run

### **Method 2: Automated Trigger (repository_dispatch)**
- Triggered when form submissions are processed
- Automatically creates branches and PRs
- No manual intervention required

## 📊 Input Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `content_type` | ✅ Yes | Choice | video-single, post-single, posts, pages |
| `content_title` | ✅ Yes | String | Title of the content |
| `content_summary` | ❌ No | String | Optional summary |
| `test_mode` | ❌ No | Boolean | Enable test content |

## 🌿 Branch Naming Convention

```
updatecontent-dd-mm-yyyy-hh-mm-ss
```

**Examples:**
- `updatecontent-15-01-2025-14-30-25`
- `updatecontent-20-12-2024-09-15-42`

## 📁 Generated File Structure

### **Content Type Mapping**
- **`video-single`** → `Video-Single/` folder
- **`post-single`** → `Post-Single/` folder
- **`posts`** → `posts/` folder
- **`pages`** → `pages/` folder

### **File Naming**
- **Slug**: Generated from title (lowercase, hyphens)
- **Unique ID**: 8-character random hex
- **Format**: `{slug}-{uniqueid}.md`

**Example**: `my-article-title-a1b2c3d4.md`

## 🔐 Permissions Required

The workflow needs these permissions:
- `contents: write` → Create branches and files
- `pull-requests: write` → Create pull requests

These are automatically provided by the `GITHUB_TOKEN`.

## 🚀 Testing the Workflow

### **Test Mode**
1. Run workflow with `test_mode: true`
2. Creates sample content for testing
3. Perfect for learning and demonstration

### **Manual Testing**
1. Go to Actions tab
2. Run "Create Content Update Branch and PR"
3. Use test parameters
4. Verify branch and PR creation

## 📋 Workflow Steps

1. **Checkout Repository** → Gets latest code
2. **Generate Branch Name** → Creates timestamp-based name
3. **Create Branch** → Switches to new branch
4. **Create Content File** → Generates Markdown with front matter
5. **Commit & Push** → Saves changes to new branch
6. **Create Pull Request** → Creates PR for review
7. **Output Results** → Shows workflow results
8. **Comment on PR** → Adds helpful comment

## 🔄 Integration with Existing System

### **Form Submission Flow**
1. User submits content through web form
2. Form handler processes submission
3. Workflow trigger script activated
4. GitHub Actions workflow runs
5. Branch and PR created automatically
6. Admin reviews and merges PR
7. `dispatch-update.yml` triggers Hugo sync

### **After PR Merge**
1. Content available in main branch
2. `dispatch-update.yml` workflow triggers
3. Repository dispatch sent to Hugo repo
4. Hugo repo syncs content
5. Website updated with new content

## 🚨 Troubleshooting

### **Common Issues**

#### **Workflow Not Triggering**
- Check workflow file syntax
- Verify trigger events are correct
- Check repository permissions

#### **Branch Creation Failed**
- Ensure `contents: write` permission
- Check for merge conflicts
- Verify target folders exist

#### **PR Creation Failed**
- Check `pull-requests: write` permission
- Verify base branch exists
- Check for workflow errors

### **Debug Steps**
1. Check workflow logs in Actions tab
2. Verify all inputs are provided
3. Check repository permissions
4. Review workflow syntax

## 📚 Example Usage

### **Example 1: Manual Workflow Run**
```
Content Type: post-single
Content Title: "My First Blog Post"
Content Summary: "This is my first blog post about technology"
Test Mode: false
```

**Result:**
- Branch: `updatecontent-15-01-2025-14-30-25`
- File: `Post-Single/my-first-blog-post-a1b2c3d4.md`
- PR: "Content Update: My First Blog Post"

### **Example 2: Automated Form Submission**
```
Content Type: pages
Content Title: "About Us"
Content Summary: "Information about our company"
Test Mode: false
```

**Result:**
- Branch: `updatecontent-15-01-2025-14-35-42`
- File: `pages/about-us-e5f6g7h8.md`
- PR: "Content Update: About Us"

## 🔗 Related Files

- **`.github/workflows/create-content-branch.yml`** → Main workflow
- **`.github/workflows/dispatch-update.yml`** → Hugo sync workflow
- **`trigger-content-branch.js`** → Workflow trigger script
- **`form-handler.js`** → Form processing
- **`submit-form.html`** → User interface

## 📞 Support

If you encounter issues:

1. **Check workflow logs** in Actions tab
2. **Verify file syntax** for YAML errors
3. **Check permissions** and repository settings
4. **Review this guide** for common solutions
5. **Test with manual trigger** first

## 🎉 Success Indicators

When the workflow runs successfully, you should see:

- ✅ New branch created with timestamp name
- ✅ Content file generated in appropriate folder
- ✅ Pull request created for review
- ✅ Helpful comment added to PR
- ✅ Console output showing success

---

**Note**: This workflow is designed to work seamlessly with the existing content submission system and Hugo sync workflow. Make sure all components are properly configured before testing.