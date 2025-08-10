---
title: "Hướng Dẫn Quản Lý Hiển Thị Nội Dung"
description: "Hướng dẫn chi tiết cách kiểm soát hiển thị trang và bài viết cho admin và người đóng góp nội dung"
date: 2025-01-01
draft: false
layout: "page"
menu: "none"
aliases: ["/huong-dan-hien-thi/", "/visibility-guide/"]
---

# Hướng Dẫn Quản Lý Hiển Thị Nội Dung

Hướng dẫn này giải thích cách kiểm soát việc hiển thị trang và bài viết trên website, giúp admin và người đóng góp nội dung hiểu rõ cách quản lý nội dung.

## Mục Lục
1. [Tổng Quan Về Hiển Thị](#tổng-quan-về-hiển-thị)
2. [Quản Lý Hiển Thị Trang](#quản-lý-hiển-thị-trang)
3. [Quản Lý Hiển Thị Bài Viết](#quản-lý-hiển-thị-bài-viết)
4. [Các Trường Hợp Sử Dụng](#các-trường-hợp-sử-dụng)
5. [Ví Dụ Thực Tế](#ví-dụ-thực-tế)

---

## Tổng Quan Về Hiển Thị

### Sự Khác Biệt Giữa Trang và Bài Viết

| Loại Nội Dung | Vị Trí Lưu Trữ | Hiển Thị Mặc Định | Cách Ẩn |
|---------------|----------------|-------------------|---------|
| **Trang** | `content/` | Chỉ khi có trong menu | `draft: true` hoặc không có trong menu |
| **Bài Viết** | `content/posts/` | Trong danh sách blog | `draft: true`, `archived: true`, hoặc `expiryDate` |

### Các Trạng Thái Hiển Thị

#### **Hiển Thị Công Khai**
- ✅ Người dùng có thể thấy
- ✅ Xuất hiện trong danh sách/tìm kiếm
- ✅ Có thể truy cập trực tiếp

#### **Ẩn Khỏi Công Chúng**
- ❌ Chỉ admin thấy được
- ❌ Không xuất hiện trong danh sách
- ❌ Có thể truy cập trực tiếp (tùy cấu hình)

#### **Ẩn Có Điều Kiện**
- ⏰ Hiển thị theo thời gian
- 🔗 Chỉ truy cập qua link trực tiếp
- 📍 Chỉ hiển thị ở vị trí cụ thể

---

## Quản Lý Hiển Thị Trang

### Cách Trang Hoạt Động

Trang được lưu trong thư mục `content/` (không phải `posts/`) và có các đặc điểm:

- **URL**: `/tên-trang/`
- **Hiển thị**: Chỉ khi có link trong navigation
- **Mục đích**: Trang tĩnh, thông tin cố định

### Các Cách Ẩn Trang

#### **1. Ẩn Khỏi Navigation (Vẫn Truy Cập Được)**

```yaml
---
title: "Trang Ẩn Khỏi Menu"
description: "Trang này không có trong navigation"
draft: false
menu: "none"  # Không hiển thị trong menu
---
```

**Kết quả:**
- ✅ Trang vẫn tồn tại và truy cập được
- ❌ Không xuất hiện trong menu navigation
- 🔗 Có thể chia sẻ link trực tiếp

#### **2. Trang Chỉ Dành Cho Admin**

```yaml
---
title: "Trang Admin"
description: "Chỉ admin thấy được"
draft: true  # Chỉ hiển thị khi đăng nhập admin
---
```

**Kết quả:**
- ❌ Người dùng thường không thấy
- ✅ Admin có thể xem và chỉnh sửa
- 🔒 Bảo mật cao

#### **3. Trang Có Thời Hạn**

```yaml
---
title: "Trang Tạm Thời"
description: "Chỉ hiển thị trong thời gian nhất định"
draft: false
publishDate: 2025-01-01  # Bắt đầu hiển thị từ ngày này
expiryDate: 2025-12-31   # Ẩn sau ngày này
---
```

**Kết quả:**
- ⏰ Hiển thị theo lịch trình
- 📅 Tự động ẩn/hiện theo thời gian
- 🎯 Phù hợp cho sự kiện, khuyến mãi

#### **4. Trang Chỉ Truy Cập Trực Tiếp**

```yaml
---
title: "Trang Bí Mật"
description: "Chỉ truy cập qua link trực tiếp"
draft: false
menu: "none"
aliases: ["/secret-page/", "/private/"]  # URL tùy chỉnh
---
```

**Kết quả:**
- 🔗 Chỉ truy cập qua link trực tiếp
- ❌ Không có trong menu
- 🔐 Bảo mật bằng cách giữ bí mật URL

---

## Quản Lý Hiển Thị Bài Viết

### Cách Bài Viết Hoạt Động

Bài viết được lưu trong thư mục `content/posts/` và có các đặc điểm:

- **URL**: `/posts/tên-bài-viết/`
- **Hiển thị**: Trong danh sách blog
- **Mục đích**: Nội dung blog, bài viết thường xuyên

### Các Cách Ẩn Bài Viết

#### **1. Ẩn Khỏi Danh Sách Blog**

```yaml
---
title: "Bài viết ẩn"
description: "Không hiển thị trong danh sách blog"
draft: true  # Hoặc archived: true
---
```

**Kết quả:**
- ❌ Không xuất hiện trong danh sách blog
- ✅ Vẫn tồn tại và có thể truy cập trực tiếp
- 🔧 Dễ dàng chỉnh sửa và xuất bản sau

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

**Kết quả:**
- ⏰ Tự động xuất bản theo lịch trình
- 📅 Có thể chuẩn bị trước
- 🎯 Phù hợp cho chiến dịch marketing

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

**Kết quả:**
- ⏰ Tự động ẩn sau thời hạn
- 📅 Phù hợp cho nội dung tạm thời
- 🗑️ Tự động dọn dẹp nội dung cũ

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

**Kết quả:**
- 📦 Được lưu trữ nhưng vẫn truy cập được
- ❌ Không xuất hiện trong danh sách blog chính
- 🔍 Có thể tìm thấy qua tìm kiếm

#### **5. Bài Viết Chỉ Truy Cập Trực Tiếp**

```yaml
---
title: "Bài viết bí mật"
description: "Chỉ truy cập qua link trực tiếp"
draft: false
archived: true  # Không hiển thị trong danh sách
aliases: ["/secret-post/", "/private-article/"]  # URL tùy chỉnh
---
```

**Kết quả:**
- 🔗 Chỉ truy cập qua link trực tiếp
- ❌ Không có trong danh sách blog
- 🔐 Bảo mật bằng cách giữ bí mật URL

---

## Các Trường Hợp Sử Dụng

### Cho Admin

#### **Quản Lý Nội Dung Nhạy Cảm**
```yaml
---
title: "Thông tin nội bộ"
draft: true  # Chỉ admin thấy
---
```

#### **Chuẩn Bị Nội Dung Trước**
```yaml
---
title: "Bài viết sắp xuất bản"
draft: false
publishDate: 2025-02-01  # Lên lịch xuất bản
---
```

#### **Trang Hỗ Trợ Ẩn**
```yaml
---
title: "Hướng dẫn nội bộ"
menu: "none"  # Không có trong menu chính
aliases: ["/internal-guide/"]
---
```

### Cho Người Đóng Góp

#### **Viết Bài Viết Nháp**
```yaml
---
title: "Bài viết đang viết"
draft: true  # Chỉ mình thấy, có thể chỉnh sửa
---
```

#### **Bài Viết Cần Review**
```yaml
---
title: "Bài viết chờ duyệt"
draft: true  # Chờ admin review
---
```

#### **Nội Dung Tạm Thời**
```yaml
---
title: "Thông báo tạm thời"
expiryDate: 2025-01-31  # Tự động ẩn sau ngày này
---
```

---

## Ví Dụ Thực Tế

### Trường Hợp 1: Trang "Về Chúng Tôi"

```yaml
---
title: "Về Chúng Tôi"
description: "Thông tin về công ty và đội ngũ"
draft: false  # Hiển thị công khai
---
```

**Kết quả:** Trang hiển thị trong menu "Về Chúng Tôi"

### Trường Hợp 2: Bài Viết Blog Thường

```yaml
---
title: "Hướng dẫn sử dụng Markdown"
description: "Học cách viết nội dung với Markdown"
draft: false  # Hiển thị trong blog
date: 2025-01-01
---
```

**Kết quả:** Bài viết xuất hiện trong danh sách blog

### Trường Hợp 3: Trang Chính Sách Ẩn

```yaml
---
title: "Chính sách bảo mật"
description: "Thông tin bảo mật người dùng"
draft: false
menu: "none"  # Không có trong menu chính
aliases: ["/privacy/", "/security-policy/"]
---
```

**Kết quả:** Trang không có trong menu nhưng truy cập được qua link footer

### Trường Hợp 4: Bài Viết Lên Lịch

```yaml
---
title: "Khuyến mãi mùa hè"
description: "Ưu đãi đặc biệt mùa hè 2025"
draft: false
publishDate: 2025-06-01  # Xuất bản từ tháng 6
date: 2025-05-15
---
```

**Kết quả:** Bài viết tự động xuất bản vào ngày 1/6/2025

### Trường Hợp 5: Nội Dung Nội Bộ

```yaml
---
title: "Hướng dẫn nội bộ cho nhân viên"
description: "Quy trình làm việc nội bộ"
draft: true  # Chỉ admin thấy
---
```

**Kết quả:** Chỉ admin có thể xem và chỉnh sửa

---

## Trường `is_page` và Cách Sử Dụng

### Giải Thích Trường `is_page`

Trường `is_page` là một trường tùy chỉnh được sử dụng để phân biệt rõ ràng giữa trang và bài viết:

#### **Giá Trị và Ý Nghĩa**
- `is_page: true` - Đây là một trang (page)
- `is_page: false` - Đây là một bài viết (post)

#### **Cách Sử Dụng**
```yaml
---
# Cho trang
title: "Về Chúng Tôi"
is_page: true
---

---
# Cho bài viết
title: "Hướng dẫn Markdown"
is_page: false
---
```

### Tại Sao Cần Trường `is_page`?

#### **Phân Biệt Rõ Ràng**
- **Trang**: Nội dung tĩnh, thông tin cố định
- **Bài viết**: Nội dung blog, cập nhật thường xuyên

#### **Xử Lý Khác Biệt**
- **Trang**: Hiển thị trong menu navigation
- **Bài viết**: Hiển thị trong danh sách blog

#### **SEO và Meta**
- **Trang**: Meta tags cho trang tĩnh
- **Bài viết**: Meta tags cho bài viết blog

### Ví Dụ Thực Tế

#### **Trang với `is_page: true`**
```yaml
---
uid: "about-page"
title: "Về Chúng Tôi"
slug: "ve-chung-toi"
is_page: true
draft: false
discoverable: true
---
```

#### **Bài viết với `is_page: false`**
```yaml
---
uid: "markdown-guide"
title: "Hướng Dẫn Markdown"
slug: "huong-dan-markdown"
is_page: false
draft: false
discoverable: true
---
```

### Lưu Ý Khi Sử Dụng

#### **Tự Động vs Thủ Công**
- **Tự động**: Hugo có thể tự xác định dựa trên vị trí file
- **Thủ công**: Sử dụng `is_page` để ghi đè hoặc làm rõ

#### **Tương Thích**
- Trường này không ảnh hưởng đến chức năng Hugo cơ bản
- Chỉ là trường bổ sung để phân loại rõ ràng hơn

---

## Lưu Ý Quan Trọng

### Bảo Mật
- **`draft: true`** không đảm bảo bảo mật 100%
- Sử dụng **authentication** cho nội dung nhạy cảm
- **URL tùy chỉnh** có thể bị đoán được

### SEO
- Nội dung ẩn không được index bởi Google
- Sử dụng **robots.txt** để kiểm soát crawling
- **Canonical URL** cho nội dung trùng lặp

### Hiệu Suất
- Nội dung ẩn vẫn được build
- Sử dụng **conditional rendering** khi cần thiết
- **Lazy loading** cho nội dung lớn

---

## Tóm Tắt

### Cách Ẩn Nội Dung

| Mục Đích | Trang | Bài Viết |
|----------|-------|----------|
| **Ẩn khỏi menu/danh sách** | `menu: "none"` | `draft: true` |
| **Chỉ admin thấy** | `draft: true` | `draft: true` |
| **Lên lịch xuất bản** | `publishDate` | `publishDate` |
| **Có thời hạn** | `expiryDate` | `expiryDate` |
| **Lưu trữ** | `archived: true` | `archived: true` |
| **URL tùy chỉnh** | `aliases` | `aliases` |

### Quy Trình Làm Việc

1. **Viết nội dung** với `draft: true`
2. **Review và chỉnh sửa**
3. **Xuất bản** bằng cách đổi `draft: false`
4. **Lên lịch** nếu cần với `publishDate`
5. **Lưu trữ** khi không còn cần thiết

---

*Hướng dẫn này được cập nhật lần cuối: Tháng 1, 2025*