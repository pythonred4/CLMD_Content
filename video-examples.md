---
uid: "video-examples-page"
title: "Ví Dụ Sử Dụng Video Shortcodes"
slug: "video-examples"
description: "Hướng dẫn và ví dụ sử dụng các video shortcodes mới"
alias: ""
published_date: "2025-01-01T10:00:00+07:00"
first_published_at: "2025-01-01T10:00:00+07:00"
tags: "video, shortcode, hướng dẫn, examples"
draft: false
discoverable: true
is_page: true
canonical_url: ""
image: ""
lang: "vi"
class_name: "video-examples-page"
layout: "page"
menu: "none"
aliases: ["/video-examples/", "/vi-du-video/"]
---

# Ví Dụ Sử Dụng Video Shortcodes

Trang này trình bày cách sử dụng các video shortcodes mới được tạo ra.

## 1. Universal Video Shortcode (Khuyến Nghị)

### Video Từ Bất Kỳ Host Nào
```markdown
{{< video-universal src="https://cdn.videy.co/JSkwWNMB1.mp4" >}}
```

### Video Với Tùy Chọn
```markdown
{{< video-universal src="https://cdn.videy.co/JSkwWNMB1.mp4" controls="true" autoplay="false" loop="false" muted="false" >}}
```

## 2. Video Local (Tệp Video Cục Bộ)

### Video Cơ Bản
```markdown
{{< video src="/videos/example.mp4" >}}
```

### Video Với Tùy Chọn
```markdown
{{< video src="/videos/example.mp4" controls="true" autoplay="false" loop="false" muted="false" >}}
```

## 3. Video YouTube (Tự Động Nhận Diện)

### YouTube Cơ Bản
```markdown
{{< video-universal src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" >}}
```

### YouTube Với Tùy Chọn
```markdown
{{< video-universal src="https://youtu.be/dQw4w9WgXcQ" autoplay="false" controls="true" >}}
```

## 4. Video Vimeo (Tự Động Nhận Diện)

### Vimeo Cơ Bản
```markdown
{{< video-universal src="https://vimeo.com/123456789" >}}
```

### Vimeo Với Tùy Chọn
```markdown
{{< video-universal src="https://vimeo.com/123456789" autoplay="false" controls="true" loop="false" >}}
```

## 5. Multiple Videos (Nhiều Video)

### Nhiều Video Cơ Bản
```markdown
{{< mul-video >}}
https://cdn.videy.co/PLoXzrJq1.mp4
https://cdn.videy.co/eJyu0Z2l2.mov
https://youtu.be/um0ETkJABmI
{{< /mul-video >}}
```

### Nhiều Video Với Tùy Chọn
```markdown
{{< mul-video controls="true" autoplay="false" gap="30px" >}}
https://cdn.videy.co/PLoXzrJq1.mp4
https://cdn.videy.co/eJyu0Z2l2.mov
https://vimeo.com/123456789
{{< /mul-video >}}
```

### Nhiều Video Hỗn Hợp (Enhanced)
```markdown
{{< mul-video-enhanced controls="true" autoplay="false" gap="30px" >}}
https://cdn.videy.co/PLoXzrJq1.mp4
https://youtu.be/um0ETkJABmI
https://vimeo.com/123456789
https://cdn.videy.co/eJyu0Z2l2.mov
{{< /mul-video-enhanced >}}
```

## Các Tham Số Có Sẵn

| Tham Số | Mô Tả | Giá Trị Mặc Định |
|---------|-------|------------------|
| `src` | Đường dẫn video | Bắt buộc |
| `controls` | Hiển thị controls | "true" |
| `autoplay` | Tự động phát | "false" |
| `loop` | Lặp lại video | "false" |
| `muted` | Tắt âm thanh | "false" |
| `poster` | Hình ảnh poster | Không có |
| `width` | Chiều rộng | "100%" |
| `height` | Chiều cao | "auto" |
| `class` | CSS class tùy chỉnh | "video-embed" |
| `gap` | Khoảng cách giữa các video (chỉ cho mul-video) | "20px" |

**Lưu ý**: 
- `video-universal` tự động nhận diện loại video từ URL, không cần chỉ định `type`.
- `mul-video` hỗ trợ video URL trực tiếp.
- `mul-video-enhanced` hỗ trợ hỗn hợp: video URL trực tiếp, YouTube, và Vimeo.

## Ví Dụ Thực Tế

### Video Từ Videy.co
{{< video-universal src="https://cdn.videy.co/JSkwWNMB1.mp4" controls="true" >}}

### Video YouTube (Kitty Dancing)
{{< video-universal src="https://youtu.be/um0ETkJABmI" controls="true" >}}

### Video Local
{{< video src="/videos/sample.mp4" controls="true" >}}

### Video Với Poster
{{< video src="/videos/with-poster.mp4" poster="/images/poster.jpg" controls="true" >}}

### Nhiều Video (Direct URLs)
{{< mul-video controls="true" gap="25px" >}}
https://cdn.videy.co/PLoXzrJq1.mp4
https://cdn.videy.co/eJyu0Z2l2.mov
{{< /mul-video >}}

### Nhiều Video Hỗn Hợp (Enhanced)
{{< mul-video-enhanced controls="true" gap="25px" >}}
https://cdn.videy.co/PLoXzrJq1.mp4
https://youtu.be/um0ETkJABmI
https://vimeo.com/123456789
{{< /mul-video-enhanced >}}

## Lưu Ý

- **Video Universal**: Hoạt động với bất kỳ video host nào cung cấp URL trực tiếp
- **Tự Động Nhận Diện**: YouTube và Vimeo được nhận diện tự động từ URL
- **Video Local**: Cần đặt file video trong thư mục `static/videos/`
- **Responsive**: Tất cả video đều responsive và hoạt động tốt trên mobile
- **Performance**: Video local sẽ tải nhanh hơn nhưng tốn băng thông
- **Embedded**: YouTube và Vimeo sẽ không tốn băng thông của server
- **Không Giới Hạn**: Có thể sử dụng với bất kỳ CDN hoặc video host nào
- **Multiple Videos**: `mul-video` cho phép nhúng nhiều video cùng lúc

---

*Trang này được tạo để demo các video shortcodes mới*