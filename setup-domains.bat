@echo off
echo ========================================
echo 🌐 CẤU HÌNH SUBDOMAIN CHO DEVELOPMENT
echo ========================================
echo.

echo ⚠️  Script này cần quyền Administrator!
echo 📝 Sẽ thêm các domain vào file hosts:
echo.
echo   127.0.0.1    app.edu.vn
echo   127.0.0.1    hrm.edu.vn  
echo   127.0.0.1    event.edu.vn
echo.

set /p confirm="Bạn có muốn tiếp tục? (y/n): "
if /i not "%confirm%"=="y" (
    echo ❌ Hủy bỏ
    pause
    exit /b
)

echo.
echo 📁 Backup hosts file hiện tại...
copy C:\Windows\System32\drivers\etc\hosts C:\Windows\System32\drivers\etc\hosts.backup.%date:~-4,4%%date:~-10,2%%date:~-7,2%

echo.
echo ✏️  Thêm domains vào hosts file...
echo. >> C:\Windows\System32\drivers\etc\hosts
echo # Microfrontend Development Domains >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1    app.edu.vn >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1    hrm.edu.vn >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1    event.edu.vn >> C:\Windows\System32\drivers\etc\hosts

echo.
echo ✅ Hoàn tất cấu hình hosts!
echo.
echo 🌐 Bây giờ bạn có thể truy cập:
echo   - http://app.edu.vn:3000   (Shell App)
echo   - http://hrm.edu.vn:3001   (HRM App)
echo   - http://event.edu.vn:3002 (Event App)
echo.
echo 🔄 Flush DNS cache...
ipconfig /flushdns

echo.
echo ✅ Xong! Hãy chạy start-all-domains.bat để khởi động với domains
pause 