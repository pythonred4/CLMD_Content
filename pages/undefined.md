---
uid: "test-shortcodes"
title: "Test Custom Video Shortcodes"
slug: "test-shortcodes"
description: "Testing the custom video shortcodes functionality"
alias: ""
published_date: "2025-01-01T10:00:00+07:00"
first_published_at: "2025-01-01T10:00:00+07:00"
tags: "test, shortcode, video"
draft: false
discoverable: true
is_page: true
canonical_url: ""
image: ""
lang: "vi"
class_name: "test-shortcodes-page"
layout: "page"
menu: "none"
aliases: ["/test-shortcodes/", "/test/"]
---

# Test Custom Video Shortcodes

This page tests the custom video shortcodes functionality.

## Test 1: Basic Video Shortcode

### Single Video from Videy.co
{{< video src="https://cdn.videy.co/JSkwWNMB1.mp4" controls="true" >}}

## Test 2: Universal Video Shortcode

### Video from Videy.co (Universal)
{{< video-universal src="https://cdn.videy.co/JSkwWNMB1.mp4" controls="true" >}}

### YouTube Video (Universal)
{{< video-universal src="https://youtu.be/um0ETkJABmI" controls="true" >}}

## Test 3: Multiple Videos (Basic)

### Multiple Direct Video URLs
{{< mul-video controls="true" gap="20px" >}}
https://cdn.videy.co/PLoXzrJq1.mp4
https://cdn.videy.co/eJyu0Z2l2.mov
{{< /mul-video >}}

## Test 4: Multiple Videos (Enhanced)

### Mixed Video Types
{{< mul-video-enhanced controls="true" gap="25px" >}}
https://cdn.videy.co/PLoXzrJq1.mp4
https://youtu.be/um0ETkJABmI
https://cdn.videy.co/eJyu0Z2l2.mov
{{< /mul-video-enhanced >}}

## Test 5: Video with Custom Parameters

### Video with Custom Styling
{{< video-universal 
    src="https://cdn.videy.co/JSkwWNMB1.mp4" 
    controls="true" 
    autoplay="false" 
    loop="false" 
    muted="false"
    width="800px"
    height="450px" >}}

## Test 6: Multiple Videos with Custom Parameters

### Multiple Videos with Custom Styling
{{< mul-video 
    controls="true" 
    autoplay="false" 
    gap="30px"
    width="100%"
    height="400px" >}}
https://cdn.videy.co/PLoXzrJq1.mp4
https://cdn.videy.co/eJyu0Z2l2.mov
{{< /mul-video >}}

## Expected Results

1. **Test 1**: Should show a single video player with controls
2. **Test 2**: Should show two videos - one direct video and one YouTube embed
3. **Test 3**: Should show two video players stacked vertically with 20px gap
4. **Test 4**: Should show three videos - one direct, one YouTube, one direct
5. **Test 5**: Should show a video with custom width and height
6. **Test 6**: Should show two videos with custom styling and 30px gap

## Notes

- All videos should be responsive
- YouTube videos should be embedded as iframes
- Direct video URLs should use HTML5 video elements
- Videos should have rounded corners and shadows
- The layout should work on mobile devices

---

*This is a test page for verifying shortcode functionality.*
