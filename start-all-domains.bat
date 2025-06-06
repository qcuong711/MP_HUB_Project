@echo off
echo ============================================
echo 🌐 KHỞI ĐỘNG MICROFRONTEND VỚI SUBDOMAINS
echo ============================================
echo.

echo 🔍 Kiểm tra cấu hình hosts file...
findstr "hrm.edu.vn" C:\Windows\System32\drivers\etc\hosts >nul
if %errorlevel% neq 0 (
    echo ❌ Hosts file chưa được cấu hình!
    echo.
    echo 📋 Bạn cần chạy setup-domains.bat trước với quyền Administrator
    echo.
    set /p setup="Bạn có muốn chạy setup domains ngay bây giờ? (y/n): "
    if /i "%setup%"=="y" (
        echo.
        echo 🚀 Chạy setup domains...
        powershell -Command "Start-Process setup-domains.bat -Verb RunAs"
        echo.
        echo ⏳ Sau khi setup xong, hãy chạy lại script này
        pause
        exit /b
    ) else (
        echo.
        echo ❌ Không thể tiếp tục không có domain configuration
        pause
        exit /b
    )
)

echo ✅ Domains đã được cấu hình!
echo.

echo 📊 Khởi động HRM App (hrm.edu.vn:3001)...
start "HRM App - hrm.edu.vn" cmd /k "cd /d D:\MyApp\hrm && npm run dev"

echo 🎉 Khởi động Event App (event.edu.vn:3002)...
start "Event App - event.edu.vn" cmd /k "cd /d D:\MyApp\event && npm run dev"

echo 🏠 Khởi động Shell App (app.edu.vn:3000)...
start "Shell App - app.edu.vn" cmd /k "cd /d D:\MyApp\frontend-gateway && npm run dev"

echo.
echo ✅ Tất cả ứng dụng đang khởi động với subdomains...
echo.
echo 🌐 Danh sách URLs (SUBDOMAIN MODE):
echo   - Shell App:  http://app.edu.vn:3000
echo   - HRM App:    http://hrm.edu.vn:3001  
echo   - Event App:  http://event.edu.vn:3002
echo.
echo 📋 Fallback URLs (nếu subdomain không hoạt động):
echo   - Shell App:  http://localhost:3000
echo   - HRM App:    http://localhost:3001  
echo   - Event App:  http://localhost:3002
echo.
echo ⏳ Vui lòng đợi 10-15 giây để tất cả apps khởi động hoàn tất
echo 🌐 Sau đó truy cập: http://app.edu.vn:3000
echo.
echo 💡 Lưu ý: Trong demo pages, hãy chọn "Subdomain mode" để test
echo.
pause 