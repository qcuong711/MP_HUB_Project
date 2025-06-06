# 🏗️ Clean Architecture Structure

## 📁 Cấu trúc dự án theo Clean Architecture

```
src/
├── Services/                    # Backend Microservices
│   ├── MasterData/             # Master Data Service
│   │   ├── Domain/             # Domain Layer
│   │   │   ├── Entities/       # Domain Entities
│   │   │   ├── ValueObjects/   # Value Objects
│   │   │   ├── Repositories/   # Repository Interfaces
│   │   │   └── Services/       # Domain Services
│   │   ├── Application/        # Application Layer
│   │   │   ├── DTOs/          # Data Transfer Objects
│   │   │   ├── Services/      # Application Services
│   │   │   ├── Mappings/      # AutoMapper Profiles
│   │   │   └── Validators/    # FluentValidation
│   │   ├── Infrastructure/     # Infrastructure Layer
│   │   │   ├── Data/          # DbContext, Configurations
│   │   │   ├── Repositories/  # Repository Implementations
│   │   │   └── Services/      # External Services
│   │   └── API/               # Presentation Layer
│   │       └── Controllers/   # Web API Controllers
│   │
│   ├── HRM/                   # HRM Service
│   │   ├── Domain/
│   │   ├── Application/
│   │   ├── Infrastructure/
│   │   └── API/
│   │
│   └── Event/                 # Event Service
│       ├── Domain/
│       ├── Application/
│       ├── Infrastructure/
│       └── API/
│
├── Gateway/                   # API Gateway
│   └── API/                   # Ocelot Gateway
│
├── Identity/                  # Identity Server
│   └── API/                   # OAuth2 + OpenID Connect
│
├── Applications/              # Frontend Applications
│   ├── Gateway/              # Shell Application
│   ├── HRM/                  # HRM Frontend
│   └── Event/                # Event Frontend
│
└── Shared/                   # Shared Libraries
    ├── Domain/               # Shared Domain Objects
    ├── Application/          # Shared Application Objects
    └── Infrastructure/       # Shared Infrastructure
```

## 🎯 Phân chia trách nhiệm

### **Master Data Service**
- **Entities**: Department, Position, Category, Country, City
- **Chức năng**: Quản lý dữ liệu danh mục chung cho toàn hệ thống

### **HRM Service**
- **Entities**: Employee, Attendance, Payroll, Performance
- **Chức năng**: Quản lý nhân sự, chấm công, tính lương

### **Event Service**
- **Entities**: Event, EventCategory, EventRegistration
- **Chức năng**: Quản lý sự kiện, đăng ký tham gia

### **Shared Libraries**
- **Domain**: Base entities, common value objects
- **Application**: Common DTOs, pagination, responses
- **Infrastructure**: Database base classes, logging

## 🔄 Dependencies

```
API Layer → Application Layer → Domain Layer
Infrastructure Layer → Application Layer → Domain Layer
```

## 📋 Quy tắc Clean Architecture

1. **Domain Layer**: Không phụ thuộc vào layer nào khác
2. **Application Layer**: Chỉ phụ thuộc vào Domain Layer
3. **Infrastructure Layer**: Phụ thuộc vào Application và Domain
4. **API Layer**: Phụ thuộc vào Application Layer

## 🚀 Lợi ích

- ✅ **Tách biệt rõ ràng** giữa business logic và technical concerns
- ✅ **Dễ test** với dependency injection
- ✅ **Maintainable** và scalable
- ✅ **Independent** của database, UI, external services
- ✅ **SOLID principles** được áp dụng đầy đủ 