# 🚀 GitHub Actions Workflow: Create Content Update Branch and PR

## 📋 Overview

This workflow automatically creates a new branch with the format `updatecontent-dd-mm-yyyy-hh-mm-ss` and creates a pull request (without merging) using the automatically generated `GITHUB_TOKEN`.

## 🎯 What It Does

1. **Creates a new branch** with timestamp format
2. **Generates content file** with proper YAML front matter
3. **Creates a pull request** for review
4. **Uses GITHUB_TOKEN** (automatically generated, no configuration needed)
5. **Does NOT merge** - creates PR for manual review

## 🔧 How to Use

### **Method 1: GitHub Actions Tab (Recommended)**

1. Go to your repository on GitHub
2. Click on **Actions** tab
3. Find **"Create Content Update Branch and PR"** workflow
4. Click **"Run workflow"** button
5. Fill in the required inputs:
   - **Content Type**: Choose from dropdown (video-single, post-single, posts, pages)
   - **Content Title**: Enter the title of your content
   - **Content Summary**: Optional summary (can be left empty)
   - **Test Mode**: Check if you want test content (uncheck for real content)
6. Click **"Run workflow"**

### **Method 2: Direct URL**

Navigate directly to:
```
https://github.com/{username}/{repository}/actions/workflows/create-content-branch.yml
```

## 📝 Input Parameters

| Parameter | Required | Type | Default | Description |
|-----------|----------|------|---------|-------------|
| `content_type` | ✅ Yes | Choice | `post-single` | Type of content to create |
| `content_title` | ✅ Yes | String | `New Content Submission` | Title of the content |
| `content_summary` | ❌ No | String | - | Optional summary description |
| `test_mode` | ❌ No | Boolean | `false` | Enable test mode for demo content |

### **Content Type Options**

- **`video-single`** → Creates file in `Video-Single/` folder
- **`post-single`** → Creates file in `Post-Single/` folder  
- **`posts`** → Creates file in `posts/` folder
- **`pages`** → Creates file in `pages/` folder

## 🌿 Branch Naming Convention

The workflow creates branches with the format:
```
updatecontent-dd-mm-yyyy-hh-mm-ss
```

**Examples:**
- `updatecontent-15-01-2025-14-30-25`
- `updatecontent-20-12-2024-09-15-42`
- `updatecontent-03-03-2025-16-45-18`

## 📁 Generated File Structure

### **File Location**
Based on content type, files are created in appropriate folders:
- `Video-Single/filename-uniqueid.md`
- `Post-Single/filename-uniqueid.md`
- `posts/filename-uniqueid.md`
- `pages/filename-uniqueid.md`

### **File Naming**
- **Slug**: Generated from title (lowercase, hyphens)
- **Unique ID**: 8-character random hex string
- **Format**: `{slug}-{uniqueid}.md`

**Example**: `my-article-title-a1b2c3d4.md`

### **YAML Front Matter**
Each file includes complete front matter:

```yaml
---
uid: a1b2c3d4
title: "Your Content Title"
slug: "your-content-title"
alias: ""
published_date: "2025-01-15T14:30:25Z"
tags: ""
draft: true
discoverable: true
is_page: false
canonical_url: ""
description: "Your content summary"
image: ""
lang: "vi"
class_name: ""
first_published_at: "2025-01-15T14:30:25Z"
hugo_destination: "content/posts/"
---
```

## 🔄 Workflow Steps

1. **Checkout Repository** → Gets latest code
2. **Generate Branch Name** → Creates timestamp-based branch name
3. **Create Branch** → Switches to new branch
4. **Create Content File** → Generates Markdown file with front matter
5. **Commit & Push** → Saves changes to new branch
6. **Create Pull Request** → Creates PR for review (does NOT merge)
7. **Output Results** → Shows workflow results
8. **Comment on PR** → Adds helpful comment to the PR

## 📋 Pull Request Details

### **PR Title**
```
Content Update: {Your Content Title}
```

### **PR Body Includes**
- Content type and title
- File location information
- Next steps for review
- Generated metadata
- Information about what happens after merge

### **PR Comment**
Automatically adds a comment with:
- Branch information
- Next steps
- What happens after merging

## 🚀 After the Workflow Runs

### **What You Get**
1. **New branch** with timestamp name
2. **Content file** in appropriate folder
3. **Pull request** ready for review
4. **Automated comment** with instructions

### **What You Need to Do**
1. **Review the generated content**
2. **Edit the content** if needed (can edit directly in PR)
3. **Add your actual content** to replace the template
4. **Test and verify** everything looks correct
5. **Approve and merge** when ready

### **What Happens After Merge**
1. Content becomes available in main branch
2. `dispatch-update.yml` workflow triggers automatically
3. Content gets synced to Hugo repository
4. Website gets updated with new content

## 🧪 Test Mode

### **Enable Test Mode**
Check the "Test mode" checkbox when running the workflow.

### **Test Content Features**
- Sample content with Markdown examples
- Generated metadata for testing
- Clear indication that it's test content
- All the same file structure and front matter

### **Use Cases**
- Testing the workflow
- Demonstrating functionality
- Learning how the system works
- Template examples

## 🔐 Permissions

### **Required Permissions**
- `contents: write` → Create branches and files
- `pull-requests: write` → Create pull requests

### **Token Used**
- **GITHUB_TOKEN** (automatically generated)
- No manual configuration needed
- GitHub automatically provides this token

## 📊 Workflow Outputs

### **Console Output**
```
✅ Content update branch created successfully!
🌿 Branch: updatecontent-15-01-2025-14-30-25
📁 File: Post-Single/my-article-title-a1b2c3d4.md
🔗 Pull Request: https://github.com/user/repo/pull/123
📝 Content Type: post-single
🎯 Hugo Destination: content/posts/
```

### **Step Outputs**
- `branch_name` → Generated branch name
- `file_path` → Path to created file
- `content_type` → Type of content
- `target_folder` → Folder where file was created
- `hugo_destination` → Hugo content destination

## 🚨 Troubleshooting

### **Common Issues**

#### **Permission Denied**
- Ensure workflow has `contents: write` and `pull-requests: write` permissions
- Check that GITHUB_TOKEN is available

#### **Branch Already Exists**
- Workflow generates unique timestamp-based names
- Very unlikely to have conflicts

#### **File Creation Failed**
- Check target folder permissions
- Verify content type is valid

#### **PR Creation Failed**
- Ensure base branch (main) exists
- Check for merge conflicts

### **Debug Steps**
1. Check workflow logs in Actions tab
2. Verify all inputs are provided
3. Check repository permissions
4. Ensure target folders exist

## 📚 Examples

### **Example 1: Create a Blog Post**
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

### **Example 2: Create a Test Page**
```
Content Type: pages
Content Title: "Test Page"
Content Summary: "Testing the workflow"
Test Mode: true
```

**Result:**
- Branch: `updatecontent-15-01-2025-14-35-42`
- File: `pages/test-page-e5f6g7h8.md`
- PR: "Content Update: Test Page"
- Test content included

## 🔗 Related Workflows

- **`process-content-submissions.yml`** → Processes form submissions
- **`dispatch-update.yml`** → Syncs content to Hugo repository
- **`create-content-branch.yml`** → This workflow (creates branches and PRs)

## 📞 Support

If you encounter issues:
1. Check the workflow logs in Actions tab
2. Verify all inputs are correct
3. Check repository permissions
4. Review the troubleshooting section above

---

**Note**: This workflow is designed to work with the existing content submission system and integrates seamlessly with the Hugo sync workflow.