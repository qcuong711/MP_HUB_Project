# Hướng dẫn cấu hình Google OAuth

Để sử dụng tính năng đăng nhập bằng Google, bạn cần thực hiện các bước sau:

## 1. Tạo Google Cloud Project

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Đảm bảo project được kích hoạt

## 2. Bật Google+ API (hoặc Google Identity API)

1. Trong Google Cloud Console, vào **APIs & Services > Library**
2. Tìm kiếm "Google+ API" hoặc "Google Identity"
3. Click vào và nhấn **Enable**

## 3. Tạo OAuth 2.0 Credentials

1. Vào **APIs & Services > Credentials**
2. Click **+ CREATE CREDENTIALS > OAuth client ID**
3. Chọn **Application type** là **Web application**
4. Đặt tên cho OAuth client (ví dụ: "Identity Server Web App")
5. Trong **Authorized redirect URIs**, thêm:
   ```
   http://localhost:5001/signin-google
   ```
6. Click **Create**

## 4. Lấy Client ID và Client Secret

1. Sau khi tạo thành công, bạn sẽ nhận được:
   - **Client ID**: Dạng `xxxxx.apps.googleusercontent.com`
   - **Client Secret**: Chuỗi ký tự ngẫu nhiên

## 5. Cập nhật cấu hình trong Program.cs

Thay thế các giá trị sau trong file `Program.cs`:

```csharp
options.ClientId = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
options.ClientSecret = "YOUR_GOOGLE_CLIENT_SECRET";
```

Với:

```csharp
options.ClientId = "client-id-thực-tế-của-bạn.apps.googleusercontent.com";
options.ClientSecret = "client-secret-thực-tế-của-bạn";
```

## 6. Bảo mật thông tin

⚠️ **Lưu ý bảo mật**: 
- Không commit Client Secret lên Git
- Sử dụng User Secrets hoặc Environment Variables trong production
- Giới hạn domain được phép sử dụng OAuth

### Sử dụng User Secrets (Khuyến nghị)

```bash
dotnet user-secrets init
dotnet user-secrets set "Authentication:Google:ClientId" "your-client-id"
dotnet user-secrets set "Authentication:Google:ClientSecret" "your-client-secret"
```

Sau đó cập nhật Program.cs:

```csharp
.AddGoogle(options =>
{
    options.ClientId = builder.Configuration["Authentication:Google:ClientId"];
    options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
    // ... các cấu hình khác
})
```

## 7. Test tính năng

1. Khởi động ứng dụng: `dotnet run`
2. Truy cập `http://localhost:5001/Account/Login`
3. Click nút "Đăng nhập bằng Google"
4. Thực hiện đăng nhập với tài khoản Google

## Troubleshooting

### Lỗi "redirect_uri_mismatch"
- Kiểm tra lại Authorized redirect URIs trong Google Cloud Console
- Đảm bảo URL chính xác: `http://localhost:5001/signin-google`

### Lỗi "invalid_client"
- Kiểm tra lại Client ID và Client Secret
- Đảm bảo API được bật

### Lỗi "access_denied"
- Người dùng từ chối cấp quyền
- Kiểm tra scopes được yêu cầu

## Tài liệu tham khảo

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [ASP.NET Core Google Authentication](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/social/google-logins) 