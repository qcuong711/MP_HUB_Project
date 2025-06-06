using AutoMapper;
using HRM.Application.DTOs;
using HRM.Domain.Entities;

namespace HRM.Application.Mappings;

/// <summary>
/// AutoMapper profile cho việc mapping giữa Entity và DTO
/// Định nghĩa các quy tắc chuyển đổi dữ liệu
/// </summary>
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Employee mappings
        CreateMap<Employee, EmployeeDto>()
            .ForMember(dest => dest.DepartmentName, opt => opt.Ignore()) // Sẽ được set riêng
            .ReverseMap()
            .ForMember(dest => dest.Id, opt => opt.Condition(src => src.Id != Guid.Empty));
        
        // Department mappings
        CreateMap<Department, DepartmentDto>()
            .ForMember(dest => dest.ParentDepartmentName, opt => opt.Ignore()) // Sẽ được set riêng
            .ForMember(dest => dest.ManagerName, opt => opt.Ignore()) // Sẽ được set riêng
            .ForMember(dest => dest.EmployeeCount, opt => opt.MapFrom(src => src.Employees.Count))
            .ForMember(dest => dest.SubDepartments, opt => opt.MapFrom(src => src.SubDepartments))
            .ReverseMap()
            .ForMember(dest => dest.Id, opt => opt.Condition(src => src.Id != Guid.Empty))
            .ForMember(dest => dest.Employees, opt => opt.Ignore())
            .ForMember(dest => dest.ParentDepartment, opt => opt.Ignore())
            .ForMember(dest => dest.SubDepartments, opt => opt.Ignore());
    }
} 