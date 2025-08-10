---
title: "Simple Auto-Embed Test"
date: 2024-12-25T16:00:00+07:00
published_date: 2024-12-25T16:00:00+07:00
draft: false
slug: "simple-embed-test"
type: "page"
layout: "single"
sitemap:
  priority: 0.1
robots: "noindex, nofollow"
---

# Simple Auto-Embed Media

This post demonstrates the new simplified auto-embed approach using basic HTML tags.

## Video Embedding

Direct video URLs now embed as simple `<video>` tags:

https://cdn.videy.co/JSkwWNMB1.mp4

This generates:
```html
<video src="https://cdn.videy.co/JSkwWNMB1.mp4" controls></video>
```

## Image Embedding

Direct image URLs embed as simple `<img>` tags:

https://files.catbox.moe/4pxn5t.jpg

This generates:
```html
<img src="https://files.catbox.moe/4pxn5t.jpg" alt="Image" loading="lazy" />
```

## Audio Embedding

Direct audio URLs embed as simple `<audio>` tags:

https://qu.ax/sample.mp3

This generates:
```html
<audio src="https://qu.ax/sample.mp3" controls></audio>
```

## Benefits of Simple Approach

✅ **Clean HTML** - No complex wrapper divs or modal systems  
✅ **Lightweight** - Much less CSS and JavaScript overhead  
✅ **Accessible** - Standard HTML5 media elements with built-in controls  
✅ **Fast Loading** - No additional JavaScript processing for modals  
✅ **Mobile Friendly** - Native browser controls work well on all devices  
✅ **SEO Friendly** - Search engines can easily understand media content  

## Supported Hosts

All the same hosts are supported:
- ✅ Pomf2, Catbox, qu.ax, Videy, 0x0.st, File.io

## Test in Editor

Go to [Markdown Editor](/markdown-editor/) and paste any supported media URL to see the simplified preview in action!