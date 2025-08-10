---
title: "Markdown Editor Auto-Embed Preview Demo"
date: 2024-12-25T13:00:00+07:00
published_date: 2024-12-25T13:00:00+07:00
draft: false
slug: "markdown-editor-preview-demo"
type: "page"
layout: "single"
sitemap:
  priority: 0.1
robots: "noindex, nofollow"
---

# Markdown Editor Auto-Embed Preview

This post demonstrates how the markdown editor now shows **real-time auto-embed previews** exactly like they would appear on the Hugo site.

## Test the Editor

Go to the [Markdown Editor](/markdown-editor/) and try pasting these URLs to see the auto-embed preview:

### Sample Video URLs
```
https://pomf.lain.la/f/sample-video.mp4
https://files.catbox.moe/test-video.webm
https://qu.ax/demo-video.mov
https://cdn.videy.co/video123.mp4
```

### Sample Image URLs  
```
https://files.catbox.moe/sample-image.jpg
https://qu.ax/test-image.png
https://pomf.lain.la/f/photo.gif
https://0x0.st/image456.webp
```

### Sample Audio URLs
```
https://0x0.st/audio123.mp3
https://qu.ax/sound.wav
https://pomf.lain.la/f/music.flac
```

## How It Works

1. **Real-time Detection**: As you type URLs from supported hosts, the preview automatically detects them
2. **Live Embed Rendering**: Shows exactly how media will appear on the Hugo site
3. **Modal Functionality**: Click on videos/images in the preview to test modal behavior
4. **Host Attribution**: Shows which service hosts the media
5. **Responsive Design**: Preview adapts to different screen sizes

## Features in Preview

### 🎬 Video Previews
- Shows video thumbnail with play overlay
- Click to open modal with full video player
- Displays host information
- Autoplay and controls in modal

### 🖼️ Image Previews  
- Responsive image display
- Click to enlarge in modal
- Loading states and error handling
- Host attribution

### 🎵 Audio Previews
- Inline audio player with controls
- Preload metadata for faster loading
- Standard HTML5 audio controls

## Supported Hosts in Preview

The editor preview supports the same hosts as the live site:

- ✅ **Pomf2** (`pomf.lain.la`)
- ✅ **Catbox** (`files.catbox.moe`) 
- ✅ **qu.ax** (`qu.ax`)
- ✅ **Videy** (`cdn.videy.co`)
- ✅ **0x0.st**
- ✅ **File.io**

## Test Instructions

1. Open the [Markdown Editor](/markdown-editor/)
2. Paste any of the sample URLs above (replace with real URLs)
3. Watch the preview area update in real-time
4. Click on embedded media to test modal functionality
5. Generate markdown file to see proper Hugo shortcode conversion

The preview now provides a complete WYSIWYG experience for auto-embedded media!