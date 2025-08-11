# 📝 Hệ Thống Gửi Nội Dung - Content Submission Hub

**Lưu ý quan trọng**: Repository này là một **Content Submission Hub** (Trung tâm gửi nội dung), không phải là Hugo static website. Nó có nhiệm vụ:

1. **Thu thập nội dung** từ người dùng qua form
2. **Tạo Pull Request** tự động cho việc review
3. **Khi merge content** → trigger workflow để sync với **private Hugo repository**

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

## 🚀 Tính Năng Chính

- ✅ **Form Gửi Nội Dung**: Giao diện tiếng Việt, dễ sử dụng
- ✅ **Hỗ Trợ Markdown**: Viết nội dung với Markdown
- ✅ **YAML Header Tự Động**: Header được tạo tự động từ nội dung
- ✅ **Phân Loại Tự Động**: File được đặt đúng thư mục dựa trên loại nội dung
- ✅ **Tạo Pull Request**: Tự động tạo PR trên GitHub cho review
- ✅ **Xem Trước Markdown**: Kiểm tra nội dung trước khi gửi
- ✅ **Không Cần Tài Khoản**: Gửi nội dung ẩn danh
- ✅ **Tự Động Sync**: Khi merge → tự động sync với Hugo repo

## 📁 Cấu Trúc Thư Mục

```
├── submit-form.html          # Form gửi nội dung chính
├── form-handler.js          # JavaScript xử lý form
├── config.js                # File cấu hình hệ thống
├── demo.html                # Trang demo và test
├── pages/
│   └── submit-content.md     # Hướng dẫn sử dụng
├── Video-Single/             # Nội dung video đơn lẻ (tạm thời)
├── Post-Single/              # Bài viết đơn lẻ (tạm thời)
├── posts/                    # Tập hợp bài viết (tạm thời)
├── pages/                    # Trang tĩnh (tạm thời)
├── .github/
│   ├── workflows/
│   │   ├── process-content-submissions.yml  # Xử lý nội dung gửi lên
│   │   └── dispatch-update.yml              # Gửi signal đến Hugo repo
│   └── scripts/
│       └── process_submission.py            # Script xử lý Python
└── README.md                 # File này
```

## 🔄 Quy Trình Hoạt Động

### 1. **Gửi Nội Dung** (User → This Repo)
1. Người dùng mở `submit-form.html`
2. Chọn loại nội dung và viết nội dung
3. Gửi form → trigger GitHub Actions workflow

### 2. **Xử Lý Nội Dung** (This Repo)
1. `process-content-submissions.yml` được kích hoạt
2. Python script xử lý và validate nội dung
3. Tạo file Markdown với YAML header
4. Tạo Pull Request cho admin review

### 3. **Review & Merge** (Admin)
1. Admin review nội dung trong PR
2. Merge PR vào main branch
3. Trigger `dispatch-update.yml` workflow

### 4. **Sync với Hugo Repo** (This Repo → Private Hugo Repo)
1. `dispatch-update.yml` gửi repository dispatch event
2. Signal được gửi đến `vsmz4laj7n/HugoTesting`
3. Hugo repo nhận signal và sync content

### 5. **Cập Nhật Website** (Private Hugo Repo)
1. Content được sync vào `content/` folder
2. Hugo site được rebuild
3. Website được deploy với nội dung mới

## 🔧 Cài Đặt & Cấu Hình

### 1. Yêu Cầu Hệ Thống

- **This Repository**: GitHub Pages + GitHub Actions
- **Private Hugo Repository**: `vsmz4laz7n/HugoTesting` (hoặc repo của bạn)
- Python 3.11+ (cho script xử lý)

### 2. Cấu Hình GitHub Actions

#### Secrets Cần Thiết:

```bash
# Cho repository này (Content Submission Hub)
GITHUB_TOKEN          # Token GitHub (tự động có)
NETLIFY_TOKEN         # Token Netlify (nếu sử dụng Netlify)
NETLIFY_SITE_ID       # ID site Netlify

# Cho việc gửi signal đến Hugo repo
PAT                   # Personal Access Token với quyền repo
```

#### Repository Dispatch Configuration:

```yaml
# .github/workflows/dispatch-update.yml
repository: your-username/your-hugo-repo  # Thay đổi thành Hugo repo của bạn
event-type: update-content-submodule      # Event type để Hugo repo nhận
```

### 3. Cấu Hình Hugo Repository

Hugo repository cần có workflow để nhận repository dispatch event:

```yaml
# Trong Hugo repo (.github/workflows/sync-content.yml)
name: Sync Content from Submission Hub
on:
  repository_dispatch:
    types:
      - update-content-submodule

jobs:
  sync-content:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Hugo repo
        uses: actions/checkout@v4
      
      - name: Sync content from submission hub
        # Logic để sync content từ submission hub
      
      - name: Build Hugo site
        # Build Hugo site với content mới
      
      - name: Deploy
        # Deploy website
```

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
6. **Xem Xét**: Admin review và phê duyệt nội dung
7. **Merge**: Merge PR vào main branch
8. **Sync Signal**: Gửi signal đến Hugo repository
9. **Content Sync**: Hugo repo sync content và rebuild website

## 🛠️ Tùy Chỉnh

### 1. Thay Đổi Hugo Repository

Chỉnh sửa `.github/workflows/dispatch-update.yml`:

```yaml
repository: your-username/your-hugo-repo  # Thay đổi thành repo của bạn
event-type: your-custom-event-type       # Thay đổi event type nếu cần
```

### 2. Thay Đổi Loại Nội Dung

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

### 3. Cấu Hình Form Handler

Chỉnh sửa `config.js`:

```javascript
const ContentSubmissionConfig = {
    submissionMethod: 'github-api', // hoặc 'netlify', 'webhook'
    github: {
        owner: 'your-username',
        repo: 'your-content-hub-repo',  // Repository này
        branch: 'main'
    },
    hugoRepo: {
        owner: 'your-username',
        repo: 'your-hugo-repo',         // Hugo repository
        eventType: 'update-content-submodule'
    }
};
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

### Test Repository Dispatch

1. Merge một PR test
2. Kiểm tra `dispatch-update.yml` workflow
3. Verify signal được gửi đến Hugo repo

## 🚨 Troubleshooting

### Lỗi Thường Gặp

1. **Permission Denied**: Kiểm tra PAT token permissions
2. **Repository Dispatch Failed**: Kiểm tra repository name và event type
3. **Hugo Repo Not Responding**: Kiểm tra workflow trong Hugo repo
4. **Content Not Syncing**: Kiểm tra sync workflow trong Hugo repo

### Debug

1. Kiểm tra GitHub Actions logs trong cả hai repo
2. Verify repository dispatch event được gửi
3. Kiểm tra Hugo repo workflow configuration
4. Test với test mode trước

## 📚 Tài Liệu Tham Khảo

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Repository Dispatch API](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event)
- [Hugo Documentation](https://gohugo.io/documentation/)
- [GitHub Pages](https://docs.github.com/en/pages)

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

## 🔗 Liên Kết Quan Trọng

- **Content Submission Form**: [submit-form.html](submit-form.html)
- **Demo & Testing**: [demo.html](demo.html)
- **User Guide**: [pages/submit-content.md](pages/submit-content.md)
- **Configuration**: [config.js](config.js)

**Lưu ý**: Đây là hệ thống demo. Trong môi trường production, hãy đảm bảo:
- Bảo mật thông tin người dùng
- Rate limiting cho form submissions
- Backup và monitoring
- Error handling đầy đủ
- Proper repository permissions