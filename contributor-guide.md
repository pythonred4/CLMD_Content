---
uid: "contributor-guide-page"
title: "Hướng Dẫn Đóng Góp Nội Dung"
slug: "contributor-guide"
description: "Hướng dẫn chi tiết cho người đóng góp nội dung về cách viết bài, sử dụng YAML headers, shortcodes và Markdown"
alias: ""
published_date: "2025-01-01T10:00:00+07:00"
first_published_at: "2025-01-01T10:00:00+07:00"
tags: "hướng dẫn, đóng góp, markdown, content"
draft: false
discoverable: true
is_page: true
canonical_url: ""
image: ""
lang: "vi"
class_name: "contributor-guide-page"
layout: "page"
menu: "none"
aliases: ["/huong-dan-dong-gop/", "/contributor-guide/"]
---

# Hướng Dẫn Đóng Góp Nội Dung

Hướng dẫn chi tiết dành cho **người đóng góp nội dung** về cách viết bài, sử dụng YAML headers, shortcodes và Markdown.

## Mục Lục
1. [Giải Thích YAML Header](#giải-thích-yaml-header)
2. [Tạo Trang và Bài Viết](#tạo-trang-và-bài-viết)
3. [Shortcodes Cho Media](#shortcodes-cho-media)
4. [Tài Nguyên Học Markdown](#tài-nguyên-học-markdown)
5. [Quy Tắc Viết Nội Dung](#quy-tắc-viết-nội-dung)
6. [Ví Dụ Bài Viết Hoàn Chỉnh](#ví-dụ-bài-viết-hoàn-chỉnh)

---

## Giải Thích YAML Header

### Các Trường Cơ Bản (Bắt Buộc)

```yaml
---
title: "Tiêu đề bài viết/trang"
description: "Mô tả ngắn gọn nội dung"
date: 2025-01-01T10:00:00+07:00
draft: false
---
```

### Các Trường Nâng Cao (Tùy Chọn)

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
- `title`: Tiêu đề hiển thị trên trang (bắt buộc)
- `description`: Mô tả cho SEO và social sharing (bắt buộc)
- `summary`: Tóm tắt ngắn gọn (khác với description)

#### **Thời Gian**
- `date`: Ngày tạo (bắt buộc)
- `lastmod`: Ngày chỉnh sửa cuối
- `publishDate`: Ngày xuất bản
- `expiryDate`: Ngày hết hạn

#### **Trạng Thái**
- `draft: true/false`: Trạng thái nháp (bắt buộc)
- `archived: true/false`: Trạng thái lưu trữ

#### **Phân Loại**
- `categories`: Danh mục chính (mảng)
- `tags`: Thẻ phân loại (chuỗi hoặc mảng)

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

## Tạo Trang và Bài Viết

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

### Cách Tạo Bài Viết Mới

#### **1. Tạo File Markdown**
```bash
# Tạo file trong thư mục content/posts/
touch content/posts/my-new-post.md
```

#### **2. Thêm YAML Header**
```yaml
---
title: "Tiêu Đề Bài Viết"
description: "Mô tả bài viết"
date: 2025-01-01T10:00:00+07:00
draft: false
tags: "tag1, tag2"
categories: ["Category1"]
---
```

#### **3. Viết Nội Dung**
```markdown
# Tiêu đề chính

Đoạn văn bản đầu tiên.

## Tiêu đề phụ

Nội dung tiếp theo...

### Tiêu đề nhỏ

- Danh sách 1
- Danh sách 2
- Danh sách 3

**Văn bản in đậm** và *văn bản in nghiêng*.
```

### Cách Tạo Trang Mới

#### **1. Tạo File Markdown**
```bash
# Tạo file trong thư mục content/
touch content/about.md
```

#### **2. Thêm YAML Header**
```yaml
---
title: "Về Chúng Tôi"
description: "Thông tin về công ty"
date: 2025-01-01T10:00:00+07:00
draft: false
layout: "page"
---
```

### Quản Lý Hiển Thị Nội Dung

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

### Cách Kiểm Soát Hiển Thị

#### **1. Ẩn Nội Dung Khỏi Danh Sách**
```yaml
---
title: "Nội dung ẩn"
description: "Không hiển thị trong danh sách"
draft: true  # Hoặc archived: true
---
```

#### **2. Nội Dung Lên Lịch**
```yaml
---
title: "Nội dung sẽ xuất bản sau"
description: "Sẽ hiển thị từ ngày chỉ định"
draft: false
publishDate: 2025-02-01  # Xuất bản từ ngày này
date: 2025-01-01
---
```

#### **3. Nội Dung Có Thời Hạn**
```yaml
---
title: "Nội dung có hạn"
description: "Sẽ ẩn sau ngày hết hạn"
draft: false
expiryDate: 2025-12-31  # Ẩn sau ngày này
date: 2025-01-01
---
```

#### **4. Nội Dung Chỉ Truy Cập Trực Tiếp**
```yaml
---
title: "Nội dung bí mật"
description: "Chỉ truy cập qua link trực tiếp"
draft: false
archived: true  # Không hiển thị trong danh sách
aliases: ["/secret-content/"]  # URL tùy chỉnh
---
```

---

## Shortcodes Cho Media

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

#### **Hình Ảnh Đơn Lớn**
```markdown
{{%/* single-image src="path/to/large-image.jpg" alt="Hình ảnh lớn" */%}}
```

#### **Lưới Hình Ảnh**
```markdown
{{%/* image-grid */%}}
{{%/* image src="image1.jpg" alt="Hình 1" */%}}
{{%/* image src="image2.jpg" alt="Hình 2" */%}}
{{%/* image src="image3.jpg" alt="Hình 3" */%}}
{{%/* /image-grid */%}}
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

#### **Hộp Media Tùy Chỉnh**
```markdown
{{%/* media-box src="path/to/media.mp4" type="video" */%}}
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

### 8. Mã Hóa Nội Dung

#### **Nội Dung Được Mã Hóa**
```markdown
{{%/* encrypt password="your-password" */%}}
Nội dung bí mật này sẽ được mã hóa.
{{%/* /encrypt */%}}
```

---

## Tài Nguyên Học Markdown

### 1. Cú Pháp Cơ Bản

#### **Tiêu Đề**
```markdown
# Tiêu đề cấp 1
## Tiêu đề cấp 2
### Tiêu đề cấp 3
#### Tiêu đề cấp 4
##### Tiêu đề cấp 5
###### Tiêu đề cấp 6
```

#### **Văn Bản**
```markdown
**Văn bản in đậm**
*Văn bản in nghiêng*
***Văn bản in đậm và nghiêng***
~~Văn bản gạch ngang~~
```

#### **Danh Sách**
```markdown
# Danh sách có thứ tự
1. Mục đầu tiên
2. Mục thứ hai
3. Mục thứ ba

# Danh sách không có thứ tự
- Mục đầu tiên
- Mục thứ hai
- Mục thứ ba

# Danh sách lồng nhau
- Mục chính
  - Mục con 1
  - Mục con 2
    - Mục con của con
```

#### **Liên Kết**
```markdown
[Văn bản liên kết](https://example.com)
[Liên kết với tiêu đề](https://example.com "Tiêu đề tooltip")
```

#### **Hình Ảnh**
```markdown
![Mô tả hình ảnh](path/to/image.jpg)
![Mô tả với tiêu đề](path/to/image.jpg "Tiêu đề hình ảnh")
```

#### **Trích Dẫn**
```markdown
> Đây là một trích dẫn
> Có thể có nhiều dòng
```

#### **Code**
```markdown
`Code inline`

```javascript
// Code block
function hello() {
    console.log("Hello World!");
}
```
```

#### **Bảng**
```markdown
| Cột 1 | Cột 2 | Cột 3 |
|-------|-------|-------|
| Dữ liệu 1 | Dữ liệu 2 | Dữ liệu 3 |
| Dữ liệu 4 | Dữ liệu 5 | Dữ liệu 6 |
```

#### **Đường Kẻ Ngang**
```markdown
---
Hoặc
***
Hoặc
___
```

### 2. Tài Nguyên Học Tập

#### **Tài Liệu Chính Thức**
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Markdown](https://docs.github.com/en/github/writing-on-github)
- [Daring Fireball](https://daringfireball.net/projects/markdown/)

#### **Công Cụ Thực Hành**
- [StackEdit](https://stackedit.io/) - Editor online
- [Typora](https://typora.io/) - Editor desktop
- [Markdown Preview Enhanced](https://shd101wyy.github.io/markdown-preview-enhanced/) - Extension VS Code

#### **Cheat Sheet**
- [Markdown Cheat Sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [Markdown Quick Reference](https://en.support.wordpress.com/markdown-quick-reference/)

---

## Quy Tắc Viết Nội Dung

### 1. Cấu Trúc Bài Viết

#### **Tiêu Đề**
- Sử dụng tiêu đề rõ ràng, mô tả chính xác nội dung
- Tránh tiêu đề quá dài hoặc quá ngắn
- Sử dụng từ khóa chính trong tiêu đề

#### **Mô Tả**
- Viết mô tả ngắn gọn, hấp dẫn
- Giới hạn 150-160 ký tự cho SEO
- Bao gồm từ khóa chính

#### **Nội Dung**
- Sử dụng cấu trúc rõ ràng với các tiêu đề phụ
- Viết đoạn văn ngắn gọn, dễ đọc
- Sử dụng danh sách khi cần thiết
- Thêm hình ảnh minh họa

### 2. Quy Tắc Viết

#### **Ngôn Ngữ**
- Viết bằng tiếng Việt có dấu
- Sử dụng ngôn ngữ phù hợp với đối tượng độc giả
- Tránh sử dụng từ ngữ quá kỹ thuật nếu không cần thiết

#### **Định Dạng**
- Sử dụng đúng cú pháp Markdown
- Kiểm tra lỗi chính tả và ngữ pháp
- Đảm bảo định dạng nhất quán

#### **Hình Ảnh**
- Sử dụng hình ảnh chất lượng cao
- Thêm alt text mô tả cho hình ảnh
- Tối ưu hóa kích thước file

### 3. SEO Cơ Bản

#### **Từ Khóa**
- Nghiên cứu từ khóa phù hợp
- Sử dụng từ khóa tự nhiên trong nội dung
- Tránh nhồi nhét từ khóa

#### **Cấu Trúc**
- Sử dụng tiêu đề H1, H2, H3 hợp lý
- Tạo nội dung có cấu trúc rõ ràng
- Thêm internal links khi cần thiết

#### **Meta Data**
- Viết title và description hấp dẫn
- Sử dụng tags và categories phù hợp
- Thêm hình ảnh featured

---

## Ví Dụ Bài Viết Hoàn Chỉnh

### YAML Header
```yaml
---
uid: "markdown-tutorial-2025"
title: "Hướng Dẫn Sử Dụng Markdown Cho Người Mới Bắt Đầu"
slug: "huong-dan-markdown"
description: "Học cách viết nội dung web với Markdown từ cơ bản đến nâng cao, bao gồm cú pháp, ví dụ thực tế và best practices"
alias: ""
published_date: "2025-01-01T09:00:00+07:00"
first_published_at: "2025-01-01T09:00:00+07:00"
tags: "markdown, hướng dẫn, tutorial, writing"
draft: false
discoverable: true
is_page: false
canonical_url: ""
image: "markdown-tutorial.jpg"
lang: "vi"
class_name: "markdown-tutorial"
---
```

### Nội Dung Bài Viết
```markdown
# Hướng Dẫn Sử Dụng Markdown Cho Người Mới Bắt Đầu

Markdown là một ngôn ngữ đánh dấu đơn giản được sử dụng rộng rãi để viết nội dung web. Trong bài viết này, chúng ta sẽ học cách sử dụng Markdown từ cơ bản đến nâng cao.

## Tại Sao Nên Sử Dụng Markdown?

Markdown có nhiều ưu điểm vượt trội so với các định dạng văn bản khác:

- **Dễ học**: Cú pháp đơn giản, trực quan
- **Đa nền tảng**: Hoạt động trên mọi hệ điều hành
- **Tương thích tốt**: Chuyển đổi dễ dàng sang HTML, PDF
- **Tập trung nội dung**: Không bị phân tâm bởi định dạng

## Cú Pháp Cơ Bản

### Tiêu Đề

Tiêu đề trong Markdown sử dụng dấu `#`:

```markdown
# Tiêu đề cấp 1
## Tiêu đề cấp 2
### Tiêu đề cấp 3
```

### Văn Bản

{{%/* collapsible title="Các kiểu định dạng văn bản" */%}}

- **In đậm**: `**văn bản**`
- *In nghiêng*: `*văn bản*`
- ***Đậm và nghiêng***: `***văn bản***`
- ~~Gạch ngang~~: `~~văn bản~~`

{{%/* /collapsible */%}}

### Danh Sách

#### Danh Sách Có Thứ Tự

1. Bước đầu tiên
2. Bước thứ hai
3. Bước thứ ba

#### Danh Sách Không Có Thứ Tự

- Mục đầu tiên
- Mục thứ hai
  - Mục con
  - Mục con khác
- Mục thứ ba

### Liên Kết và Hình Ảnh

#### Liên Kết

[Google](https://www.google.com) là công cụ tìm kiếm phổ biến nhất.

#### Hình Ảnh

{{%/* image src="markdown-example.jpg" alt="Ví dụ về Markdown" */%}}

### Bảng

| Tính Năng | Mô Tả | Ví Dụ |
|-----------|-------|-------|
| Tiêu đề | Sử dụng # | `# Tiêu đề` |
| In đậm | Sử dụng ** | `**văn bản**` |
| Danh sách | Sử dụng - | `- mục` |

## Cú Pháp Nâng Cao

### Code Blocks

```javascript
function helloWorld() {
    console.log("Hello, World!");
    return "Hello from Markdown!";
}
```

### Trích Dẫn

> Markdown được thiết kế để dễ đọc và dễ viết.
> 
> — John Gruber

### Đường Kẻ Ngang

---

## Best Practices

### 1. Cấu Trúc Rõ Ràng

- Sử dụng tiêu đề để tổ chức nội dung
- Tạo cấu trúc logic, dễ theo dõi
- Sử dụng danh sách khi cần thiết

### 2. Định Dạng Nhất Quán

- Chọn một style và áp dụng nhất quán
- Sử dụng khoảng trắng hợp lý
- Kiểm tra lỗi chính tả

### 3. Tối Ưu Hóa SEO

- Sử dụng từ khóa trong tiêu đề
- Viết mô tả hấp dẫn
- Tạo nội dung có giá trị

## Kết Luận

Markdown là công cụ mạnh mẽ cho việc viết nội dung web. Với cú pháp đơn giản và tính linh hoạt cao, Markdown giúp bạn tập trung vào nội dung thay vì định dạng.

Bắt đầu sử dụng Markdown ngay hôm nay và khám phá sức mạnh của ngôn ngữ đánh dấu này!

---

*Bài viết được cập nhật lần cuối: Tháng 1, 2025*
```

---

## Hỗ Trợ

Nếu gặp vấn đề khi viết nội dung, vui lòng:

1. **Kiểm tra cú pháp Markdown** tại các công cụ online
2. **Xem xét YAML header** có đúng định dạng không
3. **Tham khảo tài liệu Hugo** chính thức
4. **Liên hệ admin** để được hỗ trợ

### Liên Hệ

- **Email**: admin@example.com
- **Slack**: #content-team
- **Documentation**: `/manual/contributor-guide.md`

---

*Hướng dẫn này được cập nhật lần cuối: Tháng 1, 2025*