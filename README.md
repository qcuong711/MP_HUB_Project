# 🏗️ Microfrontend Architecture - Iframe Based

## 📋 Tổng quan

Dự án này triển khai kiến trúc **Microfrontend** sử dụng **Iframe** để tích hợp các ứng dụng độc lập. Hỗ trợ **cả localhost và subdomain deployment**. Đây là giải pháp đơn giản, ổn định và dễ bảo trì.

## 🏛️ Kiến trúc hệ thống

```
┌─────────────────────────────────────────┐
│     Shell App (app.edu.vn:3000)        │
│         frontend-gateway                │
│  ┌─────────────┐  ┌─────────────────┐   │
│  │   Iframe    │  │     Iframe      │   │
│  │hrm.edu.vn   │  │ event.edu.vn    │   │
│  │   :3001     │  │     :3002       │   │
│  └─────────────┘  └─────────────────┘   │
└─────────────────────────────────────────┘
```

## 📁 Cấu trúc dự án

```
MyApp/
├── frontend-gateway/         # Shell Application
│   ├── components/
│   │   └── MicrofrontendIframe.tsx  # Smart iframe component
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── demo-hrm.tsx
│   │   └── demo-event.tsx
│   └── next.config.js        # CORS & CSP config
├── hrm/                      # HRM Microfrontend
│   ├── components/
│   │   └── HrmInfo.tsx
│   ├── pages/
│   │   └── index.tsx
│   └── next.config.js        # Cross-domain headers
├── event/                    # Event Microfrontend
│   ├── components/
│   │   └── EventInfo.tsx
│   ├── pages/
│   │   └── index.tsx
│   └── next.config.js        # Cross-domain headers
├── start-all.bat             # Localhost launcher
├── start-all-domains.bat     # Subdomain launcher
└── setup-domains.bat         # Domain configuration
```

## 🚀 Cách chạy dự án

### 🌐 Phương pháp 1: Với Subdomains (KHUYẾN NGHỊ)

```bash
# Bước 1: Cấu hình domains (cần Administrator)
setup-domains.bat

# Bước 2: Khởi động với subdomains
start-all-domains.bat

# Truy cập: http://app.edu.vn:3000
```

### 📍 Phương pháp 2: Localhost truyền thống

```bash
# Chạy file batch thường
start-all.bat

# Truy cập: http://localhost:3000
```

### ⚙️ Phương pháp 3: Chạy thủ công

```bash
# Terminal 1: HRM App
cd hrm && npm run dev

# Terminal 2: Event App  
cd event && npm run dev

# Terminal 3: Shell App
cd frontend-gateway && npm run dev
```

## 🌐 URLs truy cập

### Subdomain Mode (Production-like)
- **Shell App**: http://app.edu.vn:3000
- **HRM App**: http://hrm.edu.vn:3001
- **Event App**: http://event.edu.vn:3002

### Localhost Mode (Development)
- **Shell App**: http://localhost:3000
- **HRM App**: http://localhost:3001
- **Event App**: http://localhost:3002

## ✨ Tính năng chính

### 🏠 Shell Application (frontend-gateway)
- **Trang chủ**: Điều hướng tới các microfrontends
- **Demo HRM**: Tích hợp HRM qua iframe
- **Demo Event**: Tích hợp Event qua iframe
- **Domain Switcher**: Toggle giữa localhost và subdomain
- **MicrofrontendIframe Component**: Component thông minh với:
  - Loading state với spinner
  - Error handling + retry + fallback
  - URL indicator
  - Auto-resize (same-origin)
  - Security sandbox
  - CORS support

### 👥 HRM Microfrontend
- **Dashboard**: Thống kê nhân viên (247 total, 235 active)
- **Chức năng**: Quản lý nhân viên, chấm công, báo cáo lương
- **UI**: Giao diện chuyên nghiệp với màu xanh lá
- **Domain**: hrm.edu.vn:3001

### 🎉 Event Microfrontend  
- **Dashboard**: Quản lý sự kiện (125 total events)
- **Calendar**: Sự kiện sắp tới với màu coding
- **Chức năng**: Tạo sự kiện, quản lý, báo cáo
- **UI**: Giao diện hiện đại với màu tím
- **Domain**: event.edu.vn:3002

## 🔧 Công nghệ sử dụng

- **Framework**: Next.js 14.2.5
- **Runtime**: React 18.2.0
- **Language**: TypeScript
- **Styling**: Inline CSS + Modern design system
- **Integration**: Iframe-based với CORS support
- **Domain**: Custom subdomain với hosts file
- **Security**: CSP headers, X-Frame-Options, CORS

## 🛡️ Bảo mật

### Headers Configuration
- **X-Frame-Options**: SAMEORIGIN cho microfrontends
- **Content-Security-Policy**: frame-src cho subdomains
- **Access-Control-Allow-Origin**: *.edu.vn domains
- **Sandbox**: iframe với controlled permissions

### Domain Security
```javascript
// Shell app CSP
"frame-src 'self' http://hrm.edu.vn:3001 http://event.edu.vn:3002"

// Microfrontend CORS  
"Access-Control-Allow-Origin": "http://app.edu.vn:3000"
```

## 📈 Ưu điểm của Subdomain Approach

### ✅ Pros
- **Production-ready**: Giống production thật
- **Domain isolation**: Mỗi app có domain riêng
- **SEO friendly**: Better URL structure
- **Scalable**: Dễ scale horizontal
- **Team independence**: Mỗi team deploy riêng domain
- **Load balancing**: Có thể balance theo subdomain
- **SSL support**: Wildcard cert *.edu.vn

### ⚠️ Considerations
- **DNS setup**: Cần cấu hình DNS/hosts
- **Cookie sharing**: Cần cấu hình cho cross-subdomain
- **CORS complexity**: Nhiều domain = nhiều CORS rules

## 🔄 Domain switching trong runtime

Các demo pages có **Domain Switcher** cho phép:
- 📍 **Localhost mode**: Development, nhanh, đơn giản
- 🌐 **Subdomain mode**: Production-like, realistic testing

```typescript
// Auto-fallback nếu subdomain fail
<MicrofrontendIframe
  src="http://localhost:3001"           // Fallback
  subdomainUrl="http://hrm.edu.vn:3001" // Primary
  useSubdomain={userChoice}
  title="HRM"
/>
```

## 🚀 Production Deployment

### DNS Configuration
```bash
# Real DNS records (thay thế hosts file)
app.edu.vn     A    your-server-ip
hrm.edu.vn     A    your-server-ip  
event.edu.vn   A    your-server-ip
```

### Nginx Configuration
```nginx
# Proxy cho từng subdomain
server {
    server_name app.edu.vn;
    location / {
        proxy_pass http://localhost:3000;
    }
}

server {
    server_name hrm.edu.vn;
    location / {
        proxy_pass http://localhost:3001;
    }
}

server {
    server_name event.edu.vn;
    location / {
        proxy_pass http://localhost:3002;
    }
}
```

### SSL Certificate
```bash
# Wildcard certificate
certbot certonly --dns-cloudflare -d "*.edu.vn"
```

## 🔄 Giao tiếp giữa apps (PostMessage)

```typescript
// Microfrontend gửi message
window.parent.postMessage({
  type: 'NAVIGATION',
  payload: { route: '/some-page' }
}, 'http://app.edu.vn:3000');

// Shell app nhận message
window.addEventListener('message', (event) => {
  if (event.origin !== 'http://hrm.edu.vn:3001') return;
  
  if (event.data.type === 'NAVIGATION') {
    router.push(event.data.payload.route);
  }
});
```

## 🐛 Troubleshooting

### Lỗi subdomain
```bash
# Kiểm tra hosts file
type C:\Windows\System32\drivers\etc\hosts | findstr edu.vn

# Flush DNS
ipconfig /flushdns

# Test connectivity
ping hrm.edu.vn
```

### CORS errors
- Kiểm tra `Access-Control-Allow-Origin` headers
- Verify subdomain spelling trong config
- Check browser network tab

### Iframe không load
- Inspect iframe URL trong browser
- Check X-Frame-Options
- Verify microfrontend đang chạy

## 📞 Development Workflow

1. **Development**: Sử dụng localhost mode
2. **Testing**: Sử dụng subdomain mode
3. **Staging**: Deploy to real subdomains
4. **Production**: Full DNS + SSL setup

---

**🎯 Kết luận**: Iframe-based microfrontends với subdomain support cung cấp **production-ready architecture** đơn giản và mạnh mẽ. Hỗ trợ cả development (localhost) và production-like testing (subdomains) trong cùng một codebase. 