# 🔄 Migration Guide: Clean Architecture Refactoring

## 📋 Tổng quan

Hướng dẫn di chuyển từ cấu trúc cũ sang Clean Architecture cho dự án Educational Microservices.

## 🗂️ Mapping từ cũ sang mới

### **Cấu trúc cũ:**
```
MyApp/
├── services/
│   ├── hrm/                    # Basic ASP.NET Core
│   └── master-data/            # Basic ASP.NET Core
├── src/
│   ├── applications/           # Frontend (Next.js)
│   ├── infrastructure/         # Docker, scripts
│   └── shared/                 # UI components, utils
├── ApiGateway/                 # Ocelot gateway
├── identity-server/            # IdentityServer4
└── frontend-gateway/           # Shell app
```

### **Cấu trúc mới:**
```
src/
├── Services/                   # Backend microservices
├── Gateway/                    # API Gateway
├── Identity/                   # Identity Server
├── Applications/               # Frontend applications
└── Shared/                     # Shared libraries
```

## 📦 Các bước migration

### **Bước 1: Di chuyển Backend Services**

#### **1.1 Master Data Service**
```bash
# Di chuyển từ
services/master-data/

# Sang
src/Services/MasterData/
├── Domain/
├── Application/
├── Infrastructure/
└── API/
```

**Phân chia code:**
- `Program.cs` → `src/Services/MasterData/API/Program.cs`
- Tạo mới các Domain Entities (Department, Position, Category)
- Tạo mới Application Services và DTOs
- Tạo mới Infrastructure (DbContext, Repositories)

#### **1.2 HRM Service**
```bash
# Di chuyển từ
services/hrm/

# Sang
src/Services/HRM/
├── Domain/
├── Application/
├── Infrastructure/
└── API/
```

**Phân chia code:**
- `Program.cs` → `src/Services/HRM/API/Program.cs`
- Tạo mới Domain Entities (Employee, Attendance, Payroll)
- **Lưu ý**: Employee sẽ reference đến MasterData.Department qua API call

#### **1.3 Event Service (Mới)**
```bash
# Tạo mới
src/Services/Event/
├── Domain/
├── Application/
├── Infrastructure/
└── API/
```

### **Bước 2: Di chuyển API Gateway**
```bash
# Di chuyển từ
ApiGateway/

# Sang
src/Gateway/API/
```

### **Bước 3: Di chuyển Identity Server**
```bash
# Di chuyển từ
identity-server/

# Sang
src/Identity/API/
```

### **Bước 4: Di chuyển Frontend Applications**
```bash
# Di chuyển từ
src/applications/

# Sang
src/Applications/
├── Gateway/        # từ frontend-gateway/
├── HRM/           # từ src/applications/hrm/
└── Event/         # từ src/applications/event/
```

### **Bước 5: Tạo Shared Libraries**
```bash
# Tạo mới
src/Shared/
├── Domain/Common/          # Base entities, value objects
├── Application/Common/     # Common DTOs, responses
└── Infrastructure/Common/  # Database base classes
```

## 🔧 Cấu hình Dependencies

### **Project References**

#### **MasterData Service:**
```xml
<ProjectReference Include="..\..\Shared\Domain\Shared.Domain.csproj" />
<ProjectReference Include="..\..\Shared\Application\Shared.Application.csproj" />
<ProjectReference Include="..\..\Shared\Infrastructure\Shared.Infrastructure.csproj" />
```

#### **HRM Service:**
```xml
<ProjectReference Include="..\..\Shared\Domain\Shared.Domain.csproj" />
<ProjectReference Include="..\..\Shared\Application\Shared.Application.csproj" />
<ProjectReference Include="..\..\Shared\Infrastructure\Shared.Infrastructure.csproj" />
```

### **Service Communication**
- HRM Service → MasterData Service (HTTP calls qua API Gateway)
- Event Service → MasterData Service (HTTP calls qua API Gateway)

## 📋 Checklist Migration

### **Phase 1: Cấu trúc thư mục**
- [x] Tạo cấu trúc Clean Architecture
- [x] Tạo .gitkeep files
- [x] Tạo README documentation

### **Phase 2: Shared Libraries**
- [ ] Tạo Shared.Domain project
- [ ] Tạo Shared.Application project  
- [ ] Tạo Shared.Infrastructure project

### **Phase 3: MasterData Service**
- [ ] Tạo Domain Entities (Department, Position, Category)
- [ ] Tạo Repository Interfaces
- [ ] Tạo Application Services
- [ ] Tạo DTOs và Mappings
- [ ] Tạo Infrastructure (DbContext, Repositories)
- [ ] Tạo API Controllers
- [ ] Di chuyển Program.cs và configurations

### **Phase 4: HRM Service**
- [ ] Tạo Domain Entities (Employee, Attendance, Payroll)
- [ ] Tạo Repository Interfaces
- [ ] Tạo Application Services
- [ ] Tạo DTOs và Mappings
- [ ] Tạo Infrastructure
- [ ] Tạo API Controllers
- [ ] Cấu hình HTTP Client để call MasterData

### **Phase 5: Event Service**
- [ ] Tạo Domain Entities (Event, EventRegistration)
- [ ] Tạo toàn bộ layers theo Clean Architecture
- [ ] Tạo API Controllers

### **Phase 6: Gateway & Identity**
- [ ] Di chuyển API Gateway
- [ ] Cấu hình routing cho các services mới
- [ ] Di chuyển Identity Server
- [ ] Cập nhật authentication configs

### **Phase 7: Frontend**
- [ ] Di chuyển frontend applications
- [ ] Cập nhật API endpoints
- [ ] Test integration

## ⚠️ Lưu ý quan trọng

1. **Database**: Mỗi service sẽ có database riêng
2. **Communication**: Services giao tiếp qua HTTP/API Gateway
3. **Authentication**: Tất cả services sử dụng chung Identity Server
4. **Shared Data**: Department, Position được quản lý bởi MasterData Service
5. **Testing**: Tạo unit tests cho từng layer

## 🚀 Sau khi migration

- Cấu trúc rõ ràng, dễ maintain
- Mỗi service độc lập, có thể deploy riêng
- Tuân thủ SOLID principles
- Dễ dàng thêm services mới
- Testable và scalable 