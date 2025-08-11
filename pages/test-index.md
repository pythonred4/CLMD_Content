---
title: "Test Index"
date: 2024-12-25T17:00:00+07:00
published_date: 2024-12-25T17:00:00+07:00
draft: false
slug: "test-index"
type: "page"
layout: "single"
sitemap:
  priority: 0.2
robots: "noindex, nofollow"
---

# 🧪 Test Pages Index

This page contains links to all test pages for development and quality assurance purposes.

## 📋 Available Test Pages

### Auto-Embed Feature Tests

#### 🎬 [Auto-Embed Modal Test](/auto-embed-modal-test/)
Tests the auto-embed functionality with modal features for various media hosts including Pomf2, Catbox, qu.ax, Videy, 0x0.st, and File.io.

**Features tested:**
- Video embedding with modal playback
- Image embedding with modal viewing
- Audio embedding with inline controls
- Host detection and file type recognition

#### 🔧 [Simple Auto-Embed Test](/simple-embed-test/)
Demonstrates the simplified auto-embed approach using clean HTML5 media elements without complex modal systems.

**Features tested:**
- Clean `<video>` tag embedding
- Simple `<img>` tag embedding
- Basic `<audio>` tag embedding
- Lightweight, accessible media elements

#### 🎯 [Videy URL Test](/videy-url-test/)
Specific test for Videy CDN URLs to ensure proper auto-embedding and modal functionality.

**Test URL:** `https://cdn.videy.co/JSkwWNMB1.mp4`

### Markdown Editor Tests

#### ✏️ [Markdown Editor Preview Demo](/markdown-editor-preview-demo/)
Tests the real-time preview functionality of the markdown editor with live auto-embedded media.

**Features tested:**
- Real-time markdown to HTML conversion
- Live media embedding in preview
- Toolbar functionality
- File generation with proper Hugo shortcodes

#### 🔀 [Code Block vs Auto-Embed Test](/code-block-vs-embed-test/)
Tests the critical distinction between URLs in code blocks (which should remain as text) and standalone URLs (which should auto-embed).

**Features tested:**
- URLs within ```` ``` ```` code blocks remain as text
- Standalone URLs auto-embed as media
- Proper parsing order and state tracking
- Prevention of false auto-embedding

#### 🎨 [Code Contrast Test](/code-contrast-test/)
Demonstrates the improved code block and inline code contrast and readability.

**Features tested:**
- Enhanced dark theme code contrast
- Improved light theme code contrast
- Better typography with modern monospace fonts
- Subtle borders and improved spacing
- Mixed inline code and code block examples

#### 🎬 [YouTube Embed Test](/youtube-embed-test/)
Tests YouTube video embedding functionality using both shortcodes and auto-embed.

**Features tested:**
- Manual YouTube shortcode embedding
- Auto-embed for standalone YouTube URLs
- Multiple YouTube URL format support
- Responsive iframe design with 16:9 aspect ratio
- Code block exclusion for YouTube URLs

## 🎨 Visual Testing

All test pages include:
- ✅ Responsive design testing
- ✅ Dark/light theme compatibility
- ✅ Mobile device compatibility
- ✅ Accessibility features
- ✅ SEO optimization (with noindex for test pages)

## 🔧 Development Notes

- All test pages are marked with `type: "page"` and `robots: "noindex, nofollow"`
- Test pages have low sitemap priority (0.1-0.2)
- Pages are located in `/content/pages/tests/` directory
- Test pages are invisible from main navigation but accessible via direct links

## 🚀 Quick Access

For development and testing:
1. [Markdown Editor](/markdown-editor/) - Main editing interface
2. Test any media URL from supported hosts
3. Verify auto-embedding works correctly
4. Check modal functionality
5. Test responsive design

---

**Last Updated:** 2024-12-25  
**Test Coverage:** Auto-embed, Markdown Editor, Media Modals, Code Blocks