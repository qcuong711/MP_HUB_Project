# Hệ Thống Xác Thực và Phân Quyền

Hệ thống xác thực và phân quyền sử dụng IdentityServer4 và Next.js.

## Cấu Trúc Dự Án

- `identity-server/`: Backend Identity Server (.NET Core)
- `frontend/`: Frontend ứng dụng (Next.js)

## Yêu Cầu Hệ Thống

- .NET 8.0 SDK
- Node.js 18.x
- npm hoặc yarn

## Cài Đặt và Chạy

### Identity Server

```bash
cd identity-server
dotnet restore
dotnet run
```

Identity Server sẽ chạy tại: http://localhost:5001

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

## Cấu Hình

### Identity Server

- Port: 5001
- Client ID: gateway
- Client Secret: secret
- Redirect URIs:
  - http://localhost:3000/api/auth/callback/identityserver
  - http://localhost:3000/dashboard
- Post Logout URIs:
  - http://localhost:3000
  - http://localhost:3000/dashboard

### Frontend

- Port: 3000
- NextAuth.js configuration trong `pages/api/auth/[...nextauth].ts`

## Tính Năng

- Đăng nhập/Đăng xuất
- Xác thực OAuth2/OpenID Connect
- Phân quyền dựa trên role
- Bảo mật với PKCE
- CORS được cấu hình
- Cookie authentication
- JWT token

## Bảo Mật

- Sử dụng HTTPS trong production
- PKCE cho OAuth flow
- Cookie secure policy
- CORS policy được cấu hình
- Token lifetime được quản lý

## Phát Triển

1. Clone repository
2. Cài đặt dependencies
3. Chạy Identity Server
4. Chạy Frontend
5. Truy cập http://localhost:3000

## Đóng Góp

1. Fork repository
2. Tạo branch mới
3. Commit changes
4. Push lên branch
5. Tạo Pull Request

## License

MIT 