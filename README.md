# 📝 Hệ Thống Gửi Nội Dung - Content Submission Hub

**Lưu ý quan trọng**: Repository này là một **Content Submission Hub** (Trung tâm gửi nội dung) hoạt động hoàn toàn qua **GitHub Pages** tại `https://pythonred4.github.io/CLMD_Content/`. Người dùng không cần clone repository hay download gì cả - chỉ cần truy cập website và sử dụng form gửi nội dung.

## 🌐 **Website Chính**

**URL**: https://pythonred4.github.io/CLMD_Content/

**Tính năng**: 
- ✅ **Hoạt động hoàn toàn qua web** - không cần clone repo
- ✅ **Form gửi nội dung** trực tiếp trên website
- ✅ **Xử lý tự động** qua GitHub Actions
- ✅ **Tạo Pull Request** tự động cho admin review
- ✅ **Sync với Hugo repo** khi content được merge

## 🏗️ Kiến Trúc Hệ Thống

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACE                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │        https://pythonred4.github.io/CLMD_Content/   │   │
│  │              submit-form.html                       │   │
│  │           (GitHub Pages Website)                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ (Web Form Submission)
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

- ✅ **Website hoàn chỉnh**: Hoạt động tại https://pythonred4.github.io/CLMD_Content/
- ✅ **Không cần clone repo**: Người dùng chỉ cần truy cập website
- ✅ **Form gửi nội dung**: Giao diện tiếng Việt, dễ sử dụng
- ✅ **Hỗ trợ Markdown**: Viết nội dung với Markdown
- ✅ **YAML Header Tự Động**: Header được tạo tự động từ nội dung
- ✅ **Phân Loại Tự Động**: File được đặt đúng thư mục dựa trên loại nội dung
- ✅ **Tạo Pull Request**: Tự động tạo PR trên GitHub cho review
- ✅ **Xem Trước Markdown**: Kiểm tra nội dung trước khi gửi
- ✅ **Không Cần Tài Khoản**: Gửi nội dung ẩn danh
- ✅ **Tự Động Sync**: Khi merge → tự động sync với Hugo repo

## 📝 Cách Sử Dụng (Cho Người Dùng)

### **Bước 1: Truy Cập Website**
- Mở trình duyệt web
- Truy cập: **https://pythonred4.github.io/CLMD_Content/**
- Không cần clone repository hay download gì cả

### **Bước 2: Sử Dụng Form Gửi Nội Dung**
- Tìm và mở form gửi nội dung trên website
- Hoặc truy cập trực tiếp: **https://pythonred4.github.io/CLMD_Content/submit-form.html**

### **Bước 3: Điền Thông Tin**
- Chọn loại nội dung (Video-Single/Post-Single/Posts/Pages)
- Viết tóm tắt (tùy chọn)
- Viết nội dung với Markdown
- Sử dụng nút "Xem Trước" để kiểm tra

### **Bước 4: Gửi Nội Dung**
- Nhấn "Gửi Nội Dung"
- Hệ thống sẽ tự động xử lý và tạo Pull Request
- Admin sẽ review và merge nội dung
- Nội dung sẽ được sync với Hugo website

## 🔄 Quy Trình Hoạt Động

### 1. **Gửi Nội Dung** (User → Website)
1. Người dùng truy cập https://pythonred4.github.io/CLMD_Content/
2. Mở form gửi nội dung
3. Điền và gửi nội dung → trigger GitHub Actions workflow

### 2. **Xử Lý Nội Dung** (Website → This Repo)
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

## 🔧 Cài Đặt & Cấu Hình (Cho Admin/Developer)

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
        repo: 'your-content-hub-repo',  # Repository này
        branch: 'main'
    },
    hugoRepo: {
        owner: 'your-username',
        repo: 'your-hugo-repo',         # Hugo repository
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

### Test Website

1. Truy cập https://pythonred4.github.io/CLMD_Content/
2. Mở form gửi nội dung
3. Test các tính năng của form
4. Verify Markdown preview hoạt động

## 🚨 Troubleshooting

### Lỗi Thường Gặp

1. **Permission Denied**: Kiểm tra PAT token permissions
2. **Repository Dispatch Failed**: Kiểm tra repository name và event type
3. **Hugo Repo Not Responding**: Kiểm tra workflow trong Hugo repo
4. **Content Not Syncing**: Kiểm tra sync workflow trong Hugo repo
5. **Website Not Loading**: Kiểm tra GitHub Pages settings

### Debug

1. Kiểm tra GitHub Actions logs trong cả hai repo
2. Verify repository dispatch event được gửi
3. Kiểm tra Hugo repo workflow configuration
4. Test với test mode trước
5. Kiểm tra GitHub Pages deployment status

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

- **Website Chính**: [https://pythonred4.github.io/CLMD_Content/](https://pythonred4.github.io/CLMD_Content/)
- **Content Submission Form**: [submit-form.html](submit-form.html)
- **Demo & Testing**: [demo.html](demo.html)
- **User Guide**: [pages/submit-content.md](pages/submit-content.md)
- **Configuration**: [config.js](config.js)

## 🌐 **Cách Sử Dụng Cho Người Dùng Cuối**

1. **Truy cập website**: https://pythonred4.github.io/CLMD_Content/
2. **Mở form gửi nội dung** từ website
3. **Điền thông tin** và gửi nội dung
4. **Chờ xử lý** - hệ thống sẽ tự động tạo PR
5. **Admin review** và merge nội dung
6. **Nội dung được sync** với Hugo website

**Lưu ý**: Đây là hệ thống demo. Trong môi trường production, hãy đảm bảo:
- Bảo mật thông tin người dùng
- Rate limiting cho form submissions
- Backup và monitoring
- Error handling đầy đủ
- Proper repository permissions
- GitHub Pages hoạt động ổn định