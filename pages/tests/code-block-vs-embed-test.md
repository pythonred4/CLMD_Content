---
title: "Code Block vs Auto-Embed Test"
date: 2024-12-25T15:00:00+07:00
published_date: 2024-12-25T15:00:00+07:00
draft: false
slug: "code-block-vs-embed-test"
type: "page"
layout: "single"
sitemap:
  priority: 0.1
robots: "noindex, nofollow"
---

# Testing Code Block vs Auto-Embed Behavior

This post demonstrates the difference between URLs in code blocks (which should stay as code) and standalone URLs (which should auto-embed).

## URLs in Code Blocks (Should NOT auto-embed)

These URLs are inside triple backticks and should remain as code:

```
https://pomf.lain.la/f/sample-video.mp4
https://files.catbox.moe/test-video.webm
https://qu.ax/demo-video.mov
https://cdn.videy.co/JSkwWNMB1.mp4
```

## Standalone URLs (Should auto-embed)

These URLs are standalone and should auto-embed with modal functionality:

https://cdn.videy.co/JSkwWNMB1.mp4

https://files.catbox.moe/4pxn5t.jpg

https://qu.ax/sample-audio.mp3

## Expected Behavior

### In Markdown Editor Preview:
1. **Code block URLs** → Show as `<pre><code>` block (no embedding)
2. **Standalone URLs** → Show as embedded media with play/click functionality

### On Live Hugo Site:
1. **Code block URLs** → Display as formatted code
2. **Standalone URLs** → Auto-embed with modal functionality

## Test Instructions

1. Go to [Markdown Editor](/markdown-editor/)
2. Copy this content into the editor
3. Verify that:
   - URLs inside ``` blocks show as code
   - Standalone URLs show as embedded media
   - Console logs show auto-embed detection working
4. Click on embedded media to test modal functionality

The key fix ensures that auto-embed processing respects markdown code block boundaries!