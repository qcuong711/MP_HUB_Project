@echo off
echo ========================================
echo 🚀 KHỞI ĐỘNG MICROFRONTEND ARCHITECTURE
echo ========================================
echo.

echo 📊 Khởi động HRM App (Port 3001)...
start "HRM App" cmd /k "cd /d D:\MyApp\hrm && npm run dev"

echo 🎉 Khởi động Event App (Port 3002)...
start "Event App" cmd /k "cd /d D:\MyApp\event && npm run dev"

echo 🏠 Khởi động Shell App (Port 3000)...
start "Shell App" cmd /k "cd /d D:\MyApp\frontend-gateway && npm run dev"

echo.
echo ✅ Tất cả ứng dụng đang khởi động...
echo.
echo 📋 Danh sách URLs:
echo   - Shell App:  http://localhost:3000
echo   - HRM App:    http://localhost:3001  
echo   - Event App:  http://localhost:3002
echo.
echo ⏳ Vui lòng đợi 10-15 giây để tất cả apps khởi động hoàn tất
echo 🌐 Sau đó truy cập: http://localhost:3000
echo.
pause 