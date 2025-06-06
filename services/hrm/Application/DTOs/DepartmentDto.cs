using System.ComponentModel.DataAnnotations;

namespace HRM.Application.DTOs;

/// <summary>
/// DTO cho thông tin phòng ban
/// Dùng để truyền dữ liệu giữa các layer
/// </summary>
public class DepartmentDto
{
    /// <summary>
    /// Mã định danh phòng ban
    /// </summary>
    public Guid Id { get; set; }
    
    /// <summary>
    /// Mã phòng ban duy nhất
    /// </summary>
    [Required(ErrorMessage = "Mã phòng ban là bắt buộc")]
    [StringLength(20, ErrorMessage = "Mã phòng ban không được vượt quá 20 ký tự")]
    public string DepartmentCode { get; set; } = string.Empty;
    
    /// <summary>
    /// Tên phòng ban
    /// </summary>
    [Required(ErrorMessage = "Tên phòng ban là bắt buộc")]
    [StringLength(100, ErrorMessage = "Tên phòng ban không được vượt quá 100 ký tự")]
    public string DepartmentName { get; set; } = string.Empty;
    
    /// <summary>
    /// Mô tả phòng ban
    /// </summary>
    [StringLength(500, ErrorMessage = "Mô tả không được vượt quá 500 ký tự")]
    public string? Description { get; set; }
    
    /// <summary>
    /// Phòng ban cha (nếu có)
    /// </summary>
    public Guid? ParentDepartmentId { get; set; }
    
    /// <summary>
    /// Tên phòng ban cha
    /// </summary>
    public string? ParentDepartmentName { get; set; }
    
    /// <summary>
    /// Trưởng phòng
    /// </summary>
    public Guid? ManagerId { get; set; }
    
    /// <summary>
    /// Tên trưởng phòng
    /// </summary>
    public string? ManagerName { get; set; }
    
    /// <summary>
    /// Trạng thái hoạt động
    /// </summary>
    public bool IsActive { get; set; } = true;
    
    /// <summary>
    /// Ngày tạo
    /// </summary>
    public DateTime CreatedAt { get; set; }
    
    /// <summary>
    /// Ngày cập nhật
    /// </summary>
    public DateTime UpdatedAt { get; set; }
    
    /// <summary>
    /// Người tạo
    /// </summary>
    public string? CreatedBy { get; set; }
    
    /// <summary>
    /// Người cập nhật
    /// </summary>
    public string? UpdatedBy { get; set; }
    
    /// <summary>
    /// Số lượng nhân viên trong phòng ban
    /// </summary>
    public int EmployeeCount { get; set; }
    
    /// <summary>
    /// Danh sách phòng ban con
    /// </summary>
    public List<DepartmentDto> SubDepartments { get; set; } = new List<DepartmentDto>();
} 