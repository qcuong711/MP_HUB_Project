# HRM Microfrontend Application

## 🏗️ Architecture
- **Framework:** Next.js 14.2.5 + TypeScript
- **Styling:** Tailwind CSS v3.4.0
- **Authentication:** OAuth 2.0 + OpenID Connect
- **Port:** 3001
- **Integration:** Iframe-based microfrontend

## 🔐 Authentication Flow
1. **Landing Page** → Click "Đăng nhập"
2. **Identity Server** (localhost:5001) → Login form
3. **OAuth Callback** → Dashboard with user info
4. **Logout** → Return to landing page

## 🚀 Development

### Prerequisites
- Node.js 18+
- Identity Server running on port 5001

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Application will be available at `http://localhost:3001`

### Build for Production
```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables
- `IDENTITY_SERVER_URL`: http://localhost:5001
- `APP_PORT`: 3001

### Test Credentials
- **Username:** admin
- **Password:** 123456

## 📁 Project Structure
```
hrm/
├── components/          # React components
│   ├── LandingHero.tsx # Landing page hero section
│   └── HrmInfo.tsx     # Microfrontend info component
├── lib/                # Utilities
│   └── auth.ts         # Authentication helpers
├── pages/              # Next.js pages
│   ├── index.tsx       # Landing page
│   ├── dashboard.tsx   # Protected dashboard
│   └── _app.tsx        # App wrapper
├── styles/             # Global styles
│   └── globals.css     # Tailwind + custom CSS
└── public/             # Static assets
```

## 🌐 Deployment

### Subdomain Setup
For production deployment with subdomains:
1. Configure DNS: `hrm.yourdomain.com → server_ip`
2. Update CORS origins in `next.config.js`
3. Update Identity Server client configuration

### Docker Deployment
```bash
docker build -t hrm-app .
docker run -p 3001:3001 hrm-app
```

## 🔗 Related Services
- **Identity Server:** Port 5001 (Authentication)
- **Gateway:** Port 3000 (Main shell application)
- **Event Service:** Port 3002 (Event management)

## 📝 Notes
- Standalone microfrontend application
- Can run independently without gateway
- Integrated authentication with centralized Identity Server
- Production-ready with proper error handling
