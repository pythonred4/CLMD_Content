# 📝 Hệ Thống Gửi Nội Dung Tự Động

Hệ thống gửi nội dung tự động cho GitHub Pages với khả năng tạo Pull Request và phân loại file tự động.

## 🚀 Tính Năng Chính

- ✅ **Form Gửi Nội Dung**: Giao diện tiếng Việt, dễ sử dụng
- ✅ **Hỗ Trợ Markdown**: Viết nội dung với Markdown
- ✅ **YAML Header Tự Động**: Header được tạo tự động từ nội dung
- ✅ **Phân Loại Tự Động**: File được đặt đúng thư mục dựa trên loại nội dung
- ✅ **Tạo Pull Request**: Tự động tạo PR trên GitHub
- ✅ **Xem Trước Markdown**: Kiểm tra nội dung trước khi gửi
- ✅ **Không Cần Tài Khoản**: Gửi nội dung ẩn danh

## 📁 Cấu Trúc Thư Mục

```
├── submit-form.html          # Form gửi nội dung chính
├── pages/
│   └── submit-content.md     # Trang hướng dẫn gửi nội dung
├── Video-Single/             # Nội dung video đơn lẻ
├── Post-Single/              # Bài viết đơn lẻ
├── posts/                    # Tập hợp bài viết
├── pages/                    # Trang tĩnh
├── .github/
│   ├── workflows/
│   │   └── process-content-submissions.yml  # Workflow xử lý
│   └── scripts/
│       └── process_submission.py            # Script xử lý Python
└── README.md                 # File này
```

## 🔧 Cài Đặt & Cấu Hình

### 1. Yêu Cầu Hệ Thống

- GitHub repository với GitHub Pages
- GitHub Actions được bật
- Python 3.11+ (cho script xử lý)

### 2. Cấu Hình GitHub Actions

Hệ thống sử dụng workflow `process-content-submissions.yml` để xử lý nội dung gửi lên.

#### Secrets Cần Thiết:

```bash
GITHUB_TOKEN          # Token GitHub (tự động có)
NETLIFY_TOKEN         # Token Netlify (nếu sử dụng Netlify)
NETLIFY_SITE_ID       # ID site Netlify
REPO_TOKEN            # Token cho repository chính
```

### 3. Cấu Hình Netlify (Tùy Chọn)

Nếu bạn muốn sử dụng Netlify để nhận form submissions:

1. Tạo site trên Netlify
2. Thêm form vào `submit-form.html`:

```html
<form name="content-submission" method="POST" data-netlify="true">
  <!-- form fields -->
</form>
```

3. Cấu hình webhook để trigger GitHub Actions

## 📝 Cách Sử Dụng

### 1. Gửi Nội Dung

1. Mở `submit-form.html` trong trình duyệt
2. Chọn loại nội dung (Video-Single/Post-Single/Posts/Pages)
3. Viết tóm tắt (tùy chọn)
4. Viết nội dung với Markdown
5. Sử dụng nút "Xem Trước" để kiểm tra
6. Nhấn "Gửi Nội Dung"

### 2. Quy Trình Xử Lý

1. **Gửi Form**: Người dùng gửi nội dung qua form
2. **Trigger Workflow**: GitHub Actions workflow được kích hoạt
3. **Xử Lý Nội Dung**: Script Python xử lý và validate nội dung
4. **Tạo File**: Tạo file Markdown với YAML header phù hợp
5. **Tạo Pull Request**: Tự động tạo PR cho admin review
6. **Phê Duyệt**: Admin review và merge PR

### 3. Cấu Trúc File Được Tạo

Mỗi file sẽ có YAML header tự động:

```yaml
---
uid: abc123def
title: "Tiêu Đề Bài Viết"
slug: "tieu-de-bai-viet-abc1"
alias: ""
published_date: "2025-01-01T00:00:00Z"
tags: "tag1, tag2, tag3"
draft: true
discoverable: true
is_page: false
canonical_url: ""
description: "Tóm tắt nội dung"
image: ""
lang: "vi"
class_name: ""
first_published_at: "2025-01-01T00:00:00Z"
---

# Nội dung Markdown của bạn ở đây
```

## 🔄 Workflow GitHub Actions

### Trigger Events

- `repository_dispatch`: Kích hoạt từ webhook bên ngoài
- `workflow_dispatch`: Kích hoạt thủ công từ GitHub UI

### Jobs

1. **process-submission**: Xử lý nội dung gửi lên
2. **notify-main-repo**: Thông báo cho repository chính (nếu cần)

### Outputs

Workflow tạo các outputs sau:

- `has_changes`: Có thay đổi hay không
- `submission_id`: ID của submission
- `submission_title`: Tiêu đề nội dung
- `content_type`: Loại nội dung
- `target_path`: Đường dẫn file được tạo

## 🛠️ Tùy Chỉnh

### 1. Thay Đổi Loại Nội Dung

Chỉnh sửa `content_type_mappings` trong `process_submission.py`:

```python
self.content_type_mappings = {
    'video-single': 'videos',
    'post-single': 'posts',
    'posts': 'posts',
    'pages': 'pages',
    'custom-type': 'custom-folder'  # Thêm loại mới
}
```

### 2. Thay Đổi Cấu Trúc YAML Header

Chỉnh sửa hàm `create_content_file` trong `process_submission.py`:

```python
front_matter = {
    'uid': uid,
    'title': title,
    'slug': slug,
    # Thêm fields mới
    'custom_field': 'value',
    # ...
}
```

### 3. Thay Đổi Validation Rules

Chỉnh sửa hàm `validate_submission` trong `process_submission.py`:

```python
def validate_submission(self, submission):
    errors = []
    
    # Thêm validation rules mới
    if len(submission.get('content', '')) > 100000:
        errors.append("Content too long")
    
    return errors
```

## 🧪 Testing

### Test Mode

Sử dụng workflow dispatch với test mode:

1. Vào Actions > Process Content Submissions
2. Chọn "Run workflow"
3. Điền test parameters:
   - `test_mode`: true
   - `test_content`: Nội dung test
   - `test_content_type`: Loại nội dung test

### Manual Testing

```bash
# Chạy script trực tiếp
cd .github/scripts
python process_submission.py

# Với environment variables
TEST_MODE=true TEST_CONTENT="# Test" python process_submission.py
```

## 🚨 Troubleshooting

### Lỗi Thường Gặp

1. **Permission Denied**: Kiểm tra GitHub token permissions
2. **Workflow Not Triggered**: Kiểm tra webhook configuration
3. **File Not Created**: Kiểm tra Python script logs
4. **Pull Request Not Created**: Kiểm tra workflow outputs

### Debug

1. Kiểm tra GitHub Actions logs
2. Kiểm tra Python script output
3. Verify environment variables
4. Test với test mode

## 📚 Tài Liệu Tham Khảo

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Netlify Forms](https://docs.netlify.com/forms/setup/)
- [Python YAML](https://pyyaml.org/)
- [Markdown Guide](https://www.markdownguide.org/)

## 🤝 Đóng Góp

Để đóng góp vào dự án:

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

Dự án này được phát hành dưới MIT License.

---

**Lưu ý**: Đây là hệ thống demo. Trong môi trường production, hãy đảm bảo:
- Bảo mật thông tin người dùng
- Rate limiting cho form submissions
- Backup và monitoring
- Error handling đầy đủ