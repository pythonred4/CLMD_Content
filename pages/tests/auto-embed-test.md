---
title: "Auto-Embed Modal Test"
date: 2024-12-25T12:00:00+07:00
published_date: 2024-12-25T12:00:00+07:00
draft: false
slug: "auto-embed-modal-test"
type: "page"
layout: "single"
sitemap:
  priority: 0.1
robots: "noindex, nofollow"
---

# Test Auto-Embed Modal Functionality

This page demonstrates the automatic media embedding with modal functionality for supported hosts.

## How It Works

When you click on embedded media below, it will open in a modal dialog:

### Videos
- **Videos** open in a modal with full controls and autoplay
- Click the play button overlay or the video thumbnail
- Press `Escape` or click outside to close
- Use `Space` to toggle play/pause when modal is open

### Images  
- **Images** open in an enlarged modal view
- Click on any image to view full size
- Press `Escape` or click outside to close

## Test Links

### Sample Pomf2 Links (for testing)
```
https://pomf.lain.la/f/sample-video.mp4
https://pomf.lain.la/f/sample-image.jpg
https://pomf.lain.la/f/sample-audio.mp3
```

### Sample Catbox Links (for testing)
```
https://files.catbox.moe/sample-video.mp4
https://files.catbox.moe/sample-image.png
```

### Sample qu.ax Links (for testing)
```
https://qu.ax/sample-video.mp4
https://qu.ax/sample-image.jpg
https://qu.ax/sample-audio.mp3
```

### Sample Direct URLs (replace with real URLs to test)

To test the functionality, replace these with actual media URLs from supported hosts:

**Video Example:**
```
https://pomf.lain.la/f/your-video-file.mp4
```

**Image Example:**
```
https://files.catbox.moe/your-image-file.jpg
```

**qu.ax Example:**
```
https://qu.ax/your-media-file.mp4
```

**Audio Example:**
```
https://0x0.st/your-audio-file.mp3
```

## Features

✅ **Modal Interface** - Clean overlay with blur background  
✅ **Keyboard Support** - ESC to close, Space for play/pause  
✅ **Click Outside to Close** - Intuitive modal behavior  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **Video Controls** - Full video player controls in modal  
✅ **Image Zoom** - Enlarged view for images  
✅ **Host Attribution** - Shows which service hosts the media  
✅ **Auto-detection** - Automatically detects supported media URLs  

## Supported File Types

### Video Formats
- MP4, WebM, AVI, MOV, MKV, M4V

### Image Formats  
- JPG, JPEG, PNG, GIF, WebP, SVG, BMP

### Audio Formats
- MP3, WAV, OGG, FLAC, AAC, M4A

## Configuration

The auto-embed feature can be configured via `data/media_hosts.json` to:
- Enable/disable auto-embedding
- Add new supported hosts
- Modify file type support
- Customize modal behavior

---

*Replace the sample URLs above with real media URLs from supported hosts to test the modal functionality.*