---
uid: encryption-demo
title: "Demo: Mã hóa nội dung"
slug: "encryption-demo"
alias: ""
published_date: "2024-12-19T10:00:00+00:00"
tags: "demo, encryption"
draft: false
discoverable: True
is_page: True
canonical_url: ""
description: "Demo trang mã hóa nội dung với HugoMods"
image: ""
lang: ""
class_name: ""
first_published_at: "2024-12-19T10:00:00+00:00"
---

# Demo: Mã hóa nội dung với HugoMods

Trang này demo việc sử dụng module mã hóa chính thức từ HugoMods.

## 1. Mã hóa cơ bản

{{< encrypt password="demo123" >}}
**Nội dung được mã hóa cơ bản**

Đây là nội dung được mã hóa bằng module HugoMods chính thức.
Mật khẩu: `demo123`

- Dòng 1: Thông tin bí mật
- Dòng 2: Dữ liệu quan trọng
- Dòng 3: Nội dung riêng tư
{{< /encrypt >}}

## 2. Mã hóa với nội dung nhạy cảm

{{< encrypt password="secure456" >}}
**Nội dung được mã hóa với thông tin nhạy cảm**

Đây là nội dung được mã hóa bằng module HugoMods chính thức.
Mật khẩu: `secure456`

### Thông tin bảo mật:
- **Tên**: Nguyễn Văn A
- **Email**: example@email.com
- **Số điện thoại**: 0123456789
- **Địa chỉ**: 123 Đường ABC, Quận XYZ

### Ghi chú:
Đây là thông tin nhạy cảm chỉ dành cho người được ủy quyền.
{{< /encrypt >}}

## 3. Mã hóa với thông tin cực kỳ bí mật

{{< encrypt password="123456" >}}
**Nội dung được mã hóa với thông tin cực kỳ bí mật**

Đây là nội dung được mã hóa bằng module HugoMods chính thức.
Chỉ hiển thị khi mật khẩu đúng: `123456`

### Thông tin cực kỳ bí mật:
- **Mật khẩu hệ thống**: admin123
- **API Key**: sk-1234567890abcdef
- **Database URL**: postgresql://user:pass@localhost:5432/db
- **Secret Token**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

### Lưu ý:
Nội dung này được bảo vệ bởi module HugoMods chính thức!
{{< /encrypt >}}

## 4. Nhiều khối mã hóa

{{< encrypt password="password1" >}}
**Khối 1**: Nội dung với mật khẩu `password1`
{{< /encrypt >}}

{{< encrypt password="password2" >}}
**Khối 2**: Nội dung với mật khẩu `password2`
{{< /encrypt >}}

{{< encrypt password="password3" >}}
**Khối 3**: Nội dung với mật khẩu `password3`
{{< /encrypt >}}

## Hướng dẫn sử dụng

1. **Cài đặt module**: `hugo mod get github.com/hugomods/encrypt`
2. **Mỗi khối có thể có mật khẩu riêng**
3. **Người dùng phải nhập đúng mật khẩu để xem nội dung**

### Tính năng của HugoMods Encrypt:

- ✅ **Mã hóa AES-256-GCM** - Bảo mật cao
- ✅ **Giao diện đẹp** - UI/UX chuyên nghiệp
- ✅ **Hỗ trợ đa ngôn ngữ** - Nhiều ngôn ngữ
- ✅ **Tùy chỉnh CSS** - Có thể tùy chỉnh giao diện
- ✅ **Hỗ trợ Markdown** - Nội dung Markdown đầy đủ
- ✅ **Mã nguồn mở** - Miễn phí và an toàn

### Tài liệu tham khảo:

- **Trang chủ**: https://hugomods.com/docs/content/encrypt/
- **GitHub**: https://github.com/hugomods/encrypt
- **Demo**: https://hugomods.com/docs/content/encrypt/demo/

Xem file `ENCRYPTION_README.md` để biết thêm chi tiết về cách sử dụng.