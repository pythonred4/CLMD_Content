---
uid: "admin-guide-page"
title: "Hướng Dẫn Quản Trị Website"
slug: "admin-guide"
description: "Hướng dẫn chi tiết cho admin và quản trị viên website về cách quản lý navigation, trang, bài viết, YAML headers và shortcodes"
alias: ""
published_date: "2025-01-01T10:00:00+07:00"
first_published_at: "2025-01-01T10:00:00+07:00"
tags: "admin, hướng dẫn, quản trị, website"
draft: false
discoverable: true
is_page: true
canonical_url: ""
image: ""
lang: "vi"
class_name: "admin-guide-page"
layout: "page"
menu: "none"
aliases: ["/huong-dan-admin/", "/admin-guide/"]
---

# Hướng Dẫn Quản Trị Website

Hướng dẫn chi tiết dành cho **admin** và **quản trị viên** website về cách quản lý toàn bộ hệ thống.

## Mục Lục
1. [Thêm Đường Dẫn Navigation](#thêm-đường-dẫn-navigation)
2. [Tạo Trang và Quản Lý Hiển Thị](#tạo-trang-và-quản-lý-hiển-thị)
3. [Quản Lý Bài Viết và Hiển Thị](#quản-lý-bài-viết-và-hiển-thị)
4. [Thêm Hình Ảnh Meta Khi Chia Sẻ Link](#thêm-hình-ảnh-meta)
5. [Giải Thích YAML Header](#giải-thích-yaml-header)
6. [Shortcodes Có Sẵn](#shortcodes-có-sẵn)

---

## Thêm Đường Dẫn Navigation

### Cách Thêm Menu Navigation

1. **Mở file layout**: `layouts/_default/baseof.html`
2. **Tìm phần navigation**:
```html
<nav>
    <p>
        <a href="/">Home</a>
        <a href="/posts/">Blog</a>
        <a href="/archive/">Archive Un-Release Post</a>
    </p>
</nav>
```

3. **Thêm đường dẫn mới**:
```html
<nav>
    <p>
        <a href="/">Home</a>
        <a href="/posts/">Blog</a>
        <a href="/archive/">Archive Un-Release Post</a>
        <a href="/your-new-page/">Tên Trang Mới</a>
    </p>
</nav>
```

### Tạo Trang Mới Cho Navigation

1. **Tạo file markdown** trong thư mục `content/`:
```bash
touch content/your-new-page.md
```

2. **Thêm nội dung với YAML header**:
```yaml
---
title: "Tên Trang Mới"
description: "Mô tả trang"
date: 2025-01-01
draft: false
---
```

---

## Tạo Trang và Quản Lý Hiển Thị

### Khác Biệt Giữa Trang và Bài Viết

| Đặc Điểm | **Bài Viết (Posts)** | **Trang (Pages)** |
|----------|----------------------|-------------------|
| **Vị trí lưu trữ** | `content/posts/` | `content/` (ngoài posts) |
| **Hiển thị** | Trong danh sách blog | Trang tĩnh riêng biệt |
| **URL** | `/posts/tên-bài-viết/` | `/tên-trang/` |
| **Mục đích** | Nội dung blog, bài viết | Trang thông tin, liên hệ, giới thiệu |
| **Sắp xếp** | Theo thời gian | Theo cấu trúc thư mục |
| **Navigation** | Tự động trong blog | Cần thêm vào menu |
| **RSS Feed** | Có | Không |
| **Categories/Tags** | Có | Có thể có |
| **Pagination** | Có | Không |

### Cách Tạo Trang Mới

#### **1. Tạo Trang Thông Thường**
```bash
# Tạo file markdown trong thư mục content/
touch content/about.md
touch content/contact.md
touch content/privacy-policy.md
```

#### **2. Tạo Trang Với Cấu Trúc Thư Mục**
```bash
# Tạo thư mục và file index.md
mkdir content/services
touch content/services/index.md

# Tạo trang con trong thư mục
touch content/services/web-development.md
touch content/services/mobile-apps.md
```

#### **3. Ví Dụ Nội Dung Trang**
```yaml
---
title: "Về Chúng Tôi"
description: "Thông tin về công ty và đội ngũ"
date: 2025-01-01
draft: false
layout: "page"
---
```

### Quản Lý Hiển Thị Trang

#### **Trang Hiển Thị Mặc Định**
Các trang sau sẽ **hiển thị** khi `draft: false`:
- Trang trong `content/` (không phải posts)
- Trang có URL trực tiếp: `/about`, `/contact`, `/services`
- Trang được liên kết trong navigation

#### **Trang Ẩn Mặc Định**
Các trang sau sẽ **không hiển thị** trừ khi được liên kết:
- Trang với `draft: true`
- Trang không có trong navigation
- Trang trong thư mục con không có index

### Cách Kiểm Soát Hiển Thị Trang

#### **1. Ẩn Trang Khỏi Navigation**
```yaml
---
title: "Trang Ẩn"
description: "Trang này không có trong menu"
draft: false
menu: "none"  # Không hiển thị trong menu
---
```

#### **2. Trang Chỉ Dành Cho Admin**
```yaml
---
title: "Trang Admin"
description: "Chỉ admin thấy được"
draft: true  # Chỉ hiển thị khi đăng nhập admin
---
```

#### **3. Trang Có Thời Hạn**
```yaml
---
title: "Trang Tạm Thời"
description: "Chỉ hiển thị trong thời gian nhất định"
draft: false
publishDate: 2025-01-01
expiryDate: 2025-12-31
---
```

#### **4. Trang Chỉ Truy Cập Trực Tiếp**
```yaml
---
title: "Trang Bí Mật"
description: "Chỉ truy cập qua link trực tiếp"
draft: false
menu: "none"
aliases: ["/secret-page/"]  # URL tùy chỉnh
---
```

---

## Quản Lý Bài Viết và Hiển Thị

### Cách Tạo Bài Viết Mới

#### **1. Tạo Bài Viết Thông Thường**
```bash
# Tạo file markdown trong thư mục content/posts/
touch content/posts/my-new-post.md
```

#### **2. Sử Dụng Hugo Archetype (Khuyến Nghị)**
```bash
# Tạo bài viết với template có sẵn
hugo new posts/my-new-post.md

# Tạo trang với template
hugo new about.md

# Tạo trang trong thư mục con
hugo new services/web-development.md
```

#### **3. Tạo Archetype Template**
```bash
# Tạo template cho bài viết
touch archetypes/posts.md

# Tạo template cho trang
touch archetypes/page.md
```

**Nội dung archetypes/posts.md:**
```yaml
---
title: "{{ replace .Name "-" " " | title }}"
description: ""
date: {{ .Date }}
draft: true
categories: []
tags: []
images: []
---
```

**Nội dung archetypes/page.md:**
```yaml
---
title: "{{ replace .Name "-" " " | title }}"
description: ""
date: {{ .Date }}
draft: false
layout: "page"
---
```

### Quản Lý Hiển Thị Bài Viết

#### **Bài Viết Hiển Thị Mặc Định**
Các bài viết sau sẽ **hiển thị** trong danh sách blog:
- Bài viết trong `content/posts/` với `draft: false`
- Bài viết có `date` trong quá khứ
- Bài viết không có `expiryDate` hoặc chưa hết hạn

#### **Bài Viết Ẩn Mặc Định**
Các bài viết sau sẽ **không hiển thị**:
- Bài viết với `draft: true`
- Bài viết với `date` trong tương lai
- Bài viết đã hết hạn (`expiryDate` đã qua)
- Bài viết với `archived: true`

### Cách Kiểm Soát Hiển Thị Bài Viết

#### **1. Ẩn Bài Viết Khỏi Danh Sách Blog**
```yaml
---
title: "Bài viết ẩn"
description: "Không hiển thị trong danh sách blog"
draft: true  # Hoặc archived: true
---
```

#### **2. Bài Viết Lên Lịch**
```yaml
---
title: "Bài viết sẽ xuất bản sau"
description: "Sẽ hiển thị từ ngày chỉ định"
draft: false
publishDate: 2025-02-01  # Xuất bản từ ngày này
date: 2025-01-01
---
```

#### **3. Bài Viết Có Thời Hạn**
```yaml
---
title: "Bài viết có hạn"
description: "Sẽ ẩn sau ngày hết hạn"
draft: false
expiryDate: 2025-12-31  # Ẩn sau ngày này
date: 2025-01-01
---
```

#### **4. Bài Viết Đã Lưu Trữ**
```yaml
---
title: "Bài viết cũ"
description: "Đã được lưu trữ"
draft: false
archived: true  # Không hiển thị trong danh sách chính
date: 2024-01-01
---
```

#### **5. Bài Viết Chỉ Truy Cập Trực Tiếp**
```yaml
---
title: "Bài viết bí mật"
description: "Chỉ truy cập qua link trực tiếp"
draft: false
archived: true  # Không hiển thị trong danh sách
aliases: ["/secret-post/"]  # URL tùy chỉnh
---
```

---

## Thêm Hình Ảnh Meta Khi Chia Sẻ Link

### Cách Thêm Open Graph Image

1. **Thêm vào YAML header**:
```yaml
---
title: "Tiêu Đề Trang"
description: "Mô tả trang"
date: 2025-01-01
draft: false
images:
  - "path/to/your/image.jpg"
---
```

2. **Hoặc sử dụng biến images**:
```yaml
---
title: "Tiêu Đề Trang"
description: "Mô tả trang"
images:
  - "og-image.jpg"
---
```

### Cấu Hình Open Graph

File `layouts/_default/baseof.html` đã có sẵn Open Graph tags:

```html
<meta property="og:image" content="{{ .Params.images | default .Site.Params.ogImage | absURL }}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

### Kích Thước Khuyến Nghị

- **Width**: 1200px
- **Height**: 630px
- **Format**: JPG hoặc PNG
- **File size**: Dưới 1MB

---

## Giải Thích YAML Header

### Các Trường Cơ Bản

```yaml
---
title: "Tiêu đề trang/bài viết"
description: "Mô tả ngắn gọn nội dung"
date: 2025-01-01T10:00:00+07:00
lastmod: 2025-01-02T15:30:00+07:00
draft: false
publishDate: 2025-01-01
expiryDate: 2025-12-31
---
```

### Các Trường Nâng Cao

```yaml
---
# Thông tin cơ bản
title: "Tiêu đề"
description: "Mô tả"
summary: "Tóm tắt ngắn gọn"

# Thời gian
date: 2025-01-01
lastmod: 2025-01-02
publishDate: 2025-01-01
expiryDate: 2025-12-31

# Trạng thái
draft: false
archived: false

# Phân loại
categories: ["Technology", "Programming"]
tags: ["hugo", "markdown", "web"]

# Hình ảnh
images:
  - "featured-image.jpg"
  - "og-image.jpg"
thumbnail: "thumb.jpg"

# SEO
keywords: ["keyword1", "keyword2"]
author: "Tên tác giả"
aliases: ["/old-url", "/redirect-url"]

# Tùy chỉnh
layout: "custom-layout"
type: "page"
weight: 1
menu: "main"
---
```

### Giải Thích Chi Tiết

#### **Thông Tin Cơ Bản**
- `title`: Tiêu đề hiển thị trên trang
- `description`: Mô tả cho SEO và social sharing
- `summary`: Tóm tắt ngắn gọn (khác với description)

#### **Thời Gian**
- `date`: Ngày tạo
- `lastmod`: Ngày chỉnh sửa cuối
- `publishDate`: Ngày xuất bản
- `expiryDate`: Ngày hết hạn

#### **Trạng Thái**
- `draft: true/false`: Trạng thái nháp
- `archived: true/false`: Trạng thái lưu trữ

#### **Phân Loại**
- `categories`: Danh mục chính
- `tags`: Thẻ phân loại

#### **Hình Ảnh**
- `images`: Danh sách hình ảnh cho social sharing
- `thumbnail`: Hình ảnh thu nhỏ

#### **SEO**
- `keywords`: Từ khóa SEO
- `author`: Tác giả
- `aliases`: URL thay thế

#### **Tùy Chỉnh**
- `layout`: Layout tùy chỉnh
- `type`: Loại nội dung
- `weight`: Thứ tự sắp xếp
- `menu`: Menu hiển thị

#### **Trường Đặc Biệt**
- `is_page`: `true` cho trang, `false` cho bài viết (tùy chỉnh)
- `discoverable`: `true`/`false` - Cho phép tìm kiếm
- `uid`: ID duy nhất cho nội dung
- `canonical_url`: URL chính thức cho SEO

#### **Trường Hệ Thống (Tự Động)**
- `slug`: URL slug tự động từ tên file
- `alias`: URL thay thế
- `published_date`: Ngày xuất bản (tự động)
- `first_published_at`: Ngày xuất bản đầu tiên
- `lang`: Ngôn ngữ nội dung
- `class_name`: CSS class tùy chỉnh

### Ví Dụ YAML Header Thực Tế

#### **Cho Bài Viết (Posts)**
```yaml
---
# Thông tin cơ bản
uid: "unique-id-123"
title: "Hướng Dẫn Sử Dụng Markdown Cho Người Mới Bắt Đầu"
slug: "huong-dan-markdown"
description: "Học cách viết nội dung web với Markdown từ cơ bản đến nâng cao"
alias: ""
published_date: "2025-01-01T09:00:00+07:00"
first_published_at: "2025-01-01T09:00:00+07:00"

# Trạng thái
draft: false
discoverable: true
is_page: false

# Phân loại
tags: "markdown, hướng dẫn, tutorial"
categories: ["Technology", "Tutorial"]

# SEO và Meta
canonical_url: "https://example.com/huong-dan-markdown"
image: "markdown-featured.jpg"
lang: "vi"

# Tùy chỉnh
class_name: "markdown-tutorial"
---
```

#### **Cho Trang (Pages)**
```yaml
---
# Thông tin cơ bản
uid: "page-unique-id"
title: "Về Chúng Tôi"
slug: "ve-chung-toi"
description: "Thông tin về công ty và đội ngũ"
alias: ""
published_date: "2025-01-01T10:00:00+07:00"
first_published_at: "2025-01-01T10:00:00+07:00"

# Trạng thái
draft: false
discoverable: true
is_page: true

# Phân loại
tags: "about, company"
categories: ["Company"]

# SEO và Meta
canonical_url: "https://example.com/ve-chung-toi"
image: "about-us.jpg"
lang: "vi"

# Tùy chỉnh
class_name: "about-page"
layout: "page"
menu: "main"
---
```

#### **Cho Trang Đặc Biệt (404, Homepage)**
```yaml
---
# Trang chủ
title: "Chất Lỏng Màu Đỏ META"
description: "A personal blog built with nanuq"

# Hoặc trang 404
title: "Page Not Found"
description: "The page you're looking for doesn't exist"
---
```

---

## Shortcodes Có Sẵn

### 1. Hình Ảnh

#### **Hình Ảnh Đơn**
```markdown
{{%/* image src="path/to/image.jpg" alt="Mô tả hình ảnh" */%}}
```

#### **Hình Ảnh Với Border**
```markdown
{{%/* image-box src="path/to/image.jpg" alt="Mô tả" */%}}
```

#### **Hình Ảnh Với Mô Tả**
```markdown
{{%/* image-with-description src="path/to/image.jpg" alt="Mô tả" title="Tiêu đề" description="Mô tả chi tiết" */%}}
```

### 2. Video

#### **Video Đơn**
```markdown
{{%/* video src="path/to/video.mp4" controls="true" */%}}
```

#### **Video YouTube**
```markdown
{{%/* video-enhanced src="https://youtu.be/VIDEO_ID" type="youtube" controls="true" */%}}
```

#### **Video Vimeo**
```markdown
{{%/* video-enhanced src="https://vimeo.com/VIDEO_ID" type="vimeo" controls="true" */%}}
```

#### **Video Với Mô Tả**
```markdown
{{%/* media-with-description src="path/to/video.mp4" title="Tiêu đề video" description="Mô tả video" */%}}
```

### 3. Audio

#### **Audio Player**
```markdown
{{%/* audio src="path/to/audio.mp3" controls="true" */%}}
```

### 4. Collapsible Content

#### **Nội Dung Có Thể Thu Gọn**
```markdown
{{%/* collapsible title="Tiêu đề có thể thu gọn" */%}}
Nội dung bên trong sẽ được ẩn/hiện khi click vào tiêu đề.
{{%/* /collapsible */%}}
```

### 5. Tabs

#### **Nội Dung Dạng Tab**
```markdown
{{%/* tabs */%}}
{{%/* tab "Tab 1" */%}}
Nội dung tab 1
{{%/* /tab */%}}
{{%/* tab "Tab 2" */%}}
Nội dung tab 2
{{%/* /tab */%}}
{{%/* /tabs */%}}
```

### 6. Code Blocks

#### **Code Với Highlight**
```markdown
{{%/* highlight javascript */%}}
function hello() {
    console.log("Hello World!");
}
{{%/* /highlight */%}}
```

### 7. Raw HTML

#### **Chèn HTML Tùy Chỉnh**
```markdown
{{%/* rawhtml */%}}
<div class="custom-element">
    <p>Nội dung HTML tùy chỉnh</p>
</div>
{{%/* /rawhtml */%}}
```

### 8. Image Grid

#### **Lưới Hình Ảnh**
```markdown
{{%/* image-grid */%}}
{{%/* image src="image1.jpg" alt="Hình 1" */%}}
{{%/* image src="image2.jpg" alt="Hình 2" */%}}
{{%/* image src="image3.jpg" alt="Hình 3" */%}}
{{%/* /image-grid */%}}
```

### 9. Single Image

#### **Hình Ảnh Đơn Lớn**
```markdown
{{%/* single-image src="path/to/large-image.jpg" alt="Hình ảnh lớn" */%}}
```

### 10. Media Box

#### **Hộp Media Tùy Chỉnh**
```markdown
{{%/* media-box src="path/to/media.mp4" type="video" */%}}
```

---

## Lưu Ý Quan Trọng

### Bảo Mật
- Không commit thông tin nhạy cảm vào YAML header
- Sử dụng biến môi trường cho API keys
- Kiểm tra quyền truy cập file

### Hiệu Suất
- Tối ưu hóa hình ảnh trước khi upload
- Sử dụng lazy loading cho hình ảnh
- Giới hạn kích thước file

### SEO
- Sử dụng từ khóa trong title và description
- Tối ưu hóa URL slugs
- Thêm structured data khi cần thiết

---

## Hỗ Trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra log Hugo
2. Xem xét cú pháp YAML
3. Tham khảo tài liệu Hugo chính thức
4. Liên hệ quản trị viên

---

*Hướng dẫn này được cập nhật lần cuối: Tháng 1, 2025*