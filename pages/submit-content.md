---
title: "Submit Content"
description: "Share your content with our community anonymously and safely"
date: 2025-01-01T00:00:00Z
draft: false
---

# 📝 Gửi Nội Dung

**Lưu ý quan trọng**: Repository này là một **Content Submission Hub** (Trung tâm gửi nội dung), không phải là Hugo static website. Nó có nhiệm vụ thu thập nội dung từ người dùng và tạo Pull Request cho việc review. Khi nội dung được merge, nó sẽ được sync với **private Hugo repository** để hiển thị trên website thực tế.

Chào mừng bạn đến với trang gửi nội dung! Tại đây, bạn có thể chia sẻ bài viết, video, hoặc nội dung khác với cộng đồng một cách an toàn và ẩn danh.

## 🚀 Gửi Nội Dung Ngay

**[👉 Bấm vào đây để mở form gửi nội dung](submit-form.html)**

## 📋 Các Loại Nội Dung Được Chấp Nhận

### 1. **Video-Single** 
- Nội dung video đơn lẻ
- File sẽ được đặt trong thư mục `Video-Single/`
- Hỗ trợ mô tả và tags

### 2. **Post-Single**
- Bài viết đơn lẻ
- File sẽ được đặt trong thư mục `Post-Single/`
- Phù hợp cho bài viết dài, bài phân tích

### 3. **Posts**
- Tập hợp các bài viết
- File sẽ được đặt trong thư mục `posts/`
- Dành cho bài viết ngắn, tin tức

### 4. **Pages**
- Trang tĩnh
- File sẽ được đặt trong thư mục `pages/`
- Phù hợp cho trang thông tin, hướng dẫn

## ✨ Tính Năng

- ✅ **Hỗ trợ Markdown**: Viết nội dung với Markdown
- ✅ **YAML Header Tự Động**: Header sẽ được tạo tự động
- ✅ **Xem Trước**: Xem trước nội dung Markdown trước khi gửi
- ✅ **Tạo Pull Request Tự Động**: Nội dung sẽ được tạo PR trên GitHub
- ✅ **Phân Loại Tự Động**: File sẽ được đặt đúng thư mục dựa trên loại nội dung
- ✅ **Tên File Tự Động**: Tên file sẽ được tạo từ slug trong YAML header

## 🏗️ Kiến Trúc Hệ Thống

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACE                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              submit-form.html                       │   │
│  │           (GitHub Pages Form)                      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              CONTENT SUBMISSION HUB                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           This Repository                           │   │
│  │        (GitHub Pages + Actions)                    │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │        process-content-submissions.yml      │   │   │
│  │  │         (Creates PR + Files)               │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │           dispatch-update.yml              │   │   │
│  │  │      (Signals Private Hugo Repo)           │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ (Repository Dispatch)
┌─────────────────────────────────────────────────────────────┐
│              PRIVATE HUGO REPOSITORY                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           vsmz4laj7n/HugoTesting                  │   │
│  │        (Actual Hugo Static Website)               │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │         Content Sync Workflow               │   │   │
│  │  │      (Updates content/ folder)             │   │   │
│  │  │      (Rebuilds Hugo site)                  │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Quy Trình Xử Lý

1. **Gửi Nội Dung**: Điền form và gửi nội dung
2. **Xác Thực**: Hệ thống kiểm tra và xác thực nội dung
3. **Tạo File**: Tạo file Markdown với YAML header phù hợp (tạm thời trong repo này)
4. **Tạo Pull Request**: Tự động tạo PR trên GitHub cho admin review
5. **Xem Xét**: Admin xem xét và phê duyệt nội dung
6. **Merge**: Merge PR vào main branch → trigger sync workflow
7. **Sync Hugo**: Gửi signal đến private Hugo repository để sync content
8. **Xuất Bản**: Nội dung được hiển thị trên website Hugo sau khi sync

## 📝 Hướng Dẫn Sử Dụng

### Bước 1: Chọn Loại Nội Dung
Chọn loại nội dung phù hợp từ dropdown menu.

### Bước 2: Viết Tóm Tắt (Tùy Chọn)
Viết tóm tắt ngắn gọn về nội dung của bạn.

### Bước 3: Viết Nội Dung
- Sử dụng Markdown để định dạng
- Tiêu đề chính bắt đầu bằng `# `
- Tiêu đề phụ bắt đầu bằng `## `
- Sử dụng `**text**` để **in đậm**
- Sử dụng `*text*` để *in nghiêng*
- Sử dụng ``` để tạo code block

### Bước 4: Xem Trước
Sử dụng nút "Xem Trước Markdown" để kiểm tra nội dung.

### Bước 5: Gửi
Nhấn "Gửi Nội Dung" để hoàn tất quá trình.

## 🛡️ Bảo Mật & Quyền Riêng Tư

- ✅ **Ẩn Danh**: Không cần đăng ký tài khoản
- ✅ **Không Lưu Trữ**: Thông tin cá nhân không được lưu trữ
- ✅ **Xác Thực**: Hệ thống chống spam và bot
- ✅ **Kiểm Duyệt**: Tất cả nội dung đều được kiểm duyệt trước khi xuất bản

## ❓ Câu Hỏi Thường Gặp

**Q: Tôi có cần tài khoản GitHub không?**
A: Không, bạn không cần tài khoản GitHub để gửi nội dung.

**Q: Nội dung của tôi có được xuất bản ngay lập tức không?**
A: Không, tất cả nội dung đều cần được kiểm duyệt trước khi xuất bản.

**Q: Tôi có thể chỉnh sửa nội dung sau khi gửi không?**
A: Không, hãy kiểm tra kỹ trước khi gửi. Nếu cần chỉnh sửa, hãy gửi lại.

**Q: Hệ thống có hỗ trợ hình ảnh không?**
A: Có, bạn có thể sử dụng Markdown để chèn hình ảnh: `![alt text](image-url)`

## 📞 Hỗ Trợ

Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng:
- Kiểm tra hướng dẫn này
- Xem xét các ví dụ có sẵn
- Liên hệ admin nếu cần thiết

---

**Lưu ý**: Nội dung gửi phải tuân thủ quy định của cộng đồng và không được vi phạm bản quyền hoặc chứa nội dung không phù hợp.