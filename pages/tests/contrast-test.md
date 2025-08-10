---
title: "Code Contrast Test"
date: 2024-12-25T18:00:00+07:00
published_date: 2024-12-25T18:00:00+07:00
draft: false
slug: "code-contrast-test"
type: "page"
layout: "single"
sitemap:
  priority: 0.1
robots: "noindex, nofollow"
---

# 🎨 Code Contrast Test

This page tests the improved code block and inline code contrast.

## Inline Code Examples

Here are some inline code examples: `console.log("Hello World")`, `var x = 42`, and `function getName() { return "test"; }`.

Testing different code snippets: `npm install`, `git commit -m "update"`, `hugo server --bind 0.0.0.0`.

API endpoints: `GET /api/users`, `POST /api/auth/login`, `DELETE /api/posts/{id}`.

## Code Block Examples

### JavaScript
```javascript
function autoEmbedMedia(url) {
    const mediaHosts = {
        'pomf.lain.la': { video: ['mp4', 'webm'], image: ['jpg', 'png'] },
        'files.catbox.moe': { video: ['mp4', 'webm'], image: ['jpg', 'png'] },
        'qu.ax': { video: ['mp4', 'webm'], image: ['jpg', 'png'] }
    };
    
    for (const [host, types] of Object.entries(mediaHosts)) {
        if (url.includes(host)) {
            return generateEmbedHTML(url, types);
        }
    }
    return null;
}
```

### CSS
```css
:root {
    --code-background-color: #2d2d2d;
    --code-background-highlight-color: #3d3d3d;
    --code-color: #f8f8f2;
}

code {
    font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
    background-color: var(--code-background-color);
    color: var(--code-color);
    border-radius: 4px;
    padding: 4px 6px;
}
```

### HTML
```html
<video src="https://cdn.videy.co/JSkwWNMB1.mp4" controls></video>
<img src="https://files.catbox.moe/4pxn5t.jpg" alt="Image" loading="lazy" />
<audio src="https://qu.ax/sample.mp3" controls></audio>
```

### Bash/Shell
```bash
#!/bin/bash
hugo --minify
grep -E "(robots|noindex)" public/test-index/index.html
ls -la content/pages/tests/
```

### JSON
```json
{
  "name": "qu.ax",
  "domain": "qu.ax",
  "patterns": [
    "https://qu.ax/",
    "https://www.qu.ax/"
  ],
  "types": {
    "video": {
      "extensions": ["mp4", "webm", "avi", "mov"]
    }
  }
}
```

## Mixed Content Test

Here's a paragraph with both inline code and code blocks. The `markdownToHtml()` function processes markdown content:

```javascript
function markdownToHtml(markdown) {
    // Process auto-embed URLs first
    const processedMarkdown = processAutoEmbedUrls(markdown);
    
    // Convert to HTML
    return processedMarkdown
        .replace(/```[\s\S]*?```/g, (match) => {
            return `<pre><code>${match.slice(3, -3)}</code></pre>`;
        })
        .replace(/`([^`]+)`/g, '<code>$1</code>');
}
```

The function handles both `inline code` and code blocks with improved contrast.

## Color Contrast Information

### Dark Theme
- **Code Background**: `#2d2d2d` (darker, more contrast)
- **Code Block Background**: `#3d3d3d` (darker, more contrast)  
- **Code Text**: `#f8f8f2` (brighter, more readable)
- **Border**: `rgba(255, 255, 255, 0.1)` (subtle border)

### Light Theme
- **Code Background**: `#f8f8f8` (lighter, more contrast)
- **Code Block Background**: `#ececec` (lighter, more contrast)
- **Code Text**: `#2d2d2d` (darker, more readable)
- **Border**: `rgba(0, 0, 0, 0.1)` (subtle border)

## Typography Improvements

- **Font Family**: `'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Consolas', monospace`
- **Font Weight**: `500` (medium weight for better readability)
- **Border Radius**: `4px` for inline code, `6px` for code blocks
- **Padding**: Increased for better spacing
- **Line Height**: `1.4` for code blocks (better readability)

All improvements ensure better readability across all themes and devices!