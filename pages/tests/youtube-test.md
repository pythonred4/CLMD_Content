---
title: "YouTube Embed Test"
date: 2024-12-25T19:00:00+07:00
published_date: 2024-12-25T19:00:00+07:00
draft: false
slug: "youtube-embed-test"
type: "page"
layout: "single"
sitemap:
  priority: 0.1
robots: "noindex, nofollow"
---

# 🎬 YouTube Embed Test

This page tests YouTube video embedding functionality using both shortcodes and auto-embed.

## Manual YouTube Shortcode

Using the `{{< youtube >}}` shortcode:

{{< youtube url="https://www.youtube.com/watch?v=jWAnI2Vn5UE" >}}

## Auto-Embed Support

Direct YouTube URLs should automatically embed when posted as standalone links:

https://www.youtube.com/watch?v=v4qZvLVPsyQ

## Supported YouTube URL Formats

The following URL formats are supported:

### Standard YouTube URLs
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtube.com/watch?v=VIDEO_ID`  
- `https://m.youtube.com/watch?v=VIDEO_ID`

### YouTube Short URLs
- `https://youtu.be/VIDEO_ID`

## Code Block Test

URLs inside code blocks should NOT auto-embed:

```
https://www.youtube.com/watch?v=example123
https://youtu.be/example456
```

## Features

✅ **Responsive Design** - Videos scale to container width  
✅ **16:9 Aspect Ratio** - Maintains proper video proportions  
✅ **Full Controls** - Standard YouTube player controls  
✅ **Auto-Embed** - Standalone URLs automatically convert to embeds  
✅ **Manual Shortcode** - `{{< youtube url="..." >}}` for explicit embedding  
✅ **Privacy Respect** - Uses youtube.com (not youtube-nocookie.com)  
✅ **Accessibility** - Proper iframe attributes and fallbacks  

## Technical Details

### Auto-Embed Configuration
YouTube support is configured in `data/media_hosts.json`:

```json
{
  "name": "YouTube",
  "domain": "youtube.com", 
  "patterns": [
    "https://www.youtube.com/watch?v=",
    "https://youtube.com/watch?v=",
    "https://youtu.be/",
    "https://m.youtube.com/watch?v="
  ],
  "types": {
    "iframe": {
      "extensions": [""],
      "embed_type": "youtube"
    }
  }
}
```

### Generated HTML
YouTube URLs generate responsive iframe embeds:

```html
<iframe 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  width="560" 
  height="315" 
  frameborder="0" 
  allowfullscreen
  style="max-width: 100%; height: auto; aspect-ratio: 16/9;">
</iframe>
```

## Difference from Direct Video Files

Unlike direct video files (MP4, WebM, etc.) that use `<video>` tags, YouTube links use iframe embeds because:

- YouTube URLs are web pages, not direct video files
- `<video>` tags cannot play YouTube URLs directly  
- YouTube requires their embed player for playback
- Iframe embeds provide full YouTube functionality (controls, captions, etc.)

## Fixed Issues

✅ **Hugo Template Parsing** - Used `strings.Contains` instead of `contains`  
✅ **Video ID Extraction** - Proper parsing of both standard and short URLs  
✅ **Auto-Embed Detection** - YouTube URLs detected as iframe type  
✅ **Responsive Styling** - Proper aspect ratio and mobile compatibility  
✅ **Markdown Editor Preview** - YouTube embeds work in real-time preview  

The YouTube embed system now works seamlessly for both manual shortcodes and auto-embedded standalone URLs!