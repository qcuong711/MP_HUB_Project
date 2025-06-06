using System.ComponentModel.DataAnnotations;

namespace HRM.Domain.Entities;

/// <summary>
/// Entity nhân viên - Domain layer
/// Đại diện cho thực thể nhân viên trong hệ thống HRM
/// </summary>
public class Employee
{
    /// <summary>
    /// Mã định danh nhân viên
    /// </summary>
    public Guid Id { get; set; }
    
    /// <summary>
    /// Mã nhân viên duy nhất
    /// </summary>
    [Required]
    [StringLength(20)]
    public string EmployeeCode { get; set; } = string.Empty;
    
    /// <summary>
    /// Họ và tên nhân viên
    /// </summary>
    [Required]
    [StringLength(100)]
    public string FullName { get; set; } = string.Empty;
    
    /// <summary>
    /// Email nhân viên
    /// </summary>
    [Required]
    [EmailAddress]
    [StringLength(100)]
    public string Email { get; set; } = string.Empty;
    
    /// <summary>
    /// Số điện thoại
    /// </summary>
    [StringLength(20)]
    public string? PhoneNumber { get; set; }
    
    /// <summary>
    /// Ngày sinh
    /// </summary>
    public DateTime? DateOfBirth { get; set; }
    
    /// <summary>
    /// Ngày vào làm
    /// </summary>
    public DateTime HireDate { get; set; }
    
    /// <summary>
    /// Chức vụ
    /// </summary>
    [StringLength(50)]
    public string? Position { get; set; }
    
    /// <summary>
    /// Phòng ban ID
    /// </summary>
    public Guid? DepartmentId { get; set; }
    
    /// <summary>
    /// Trạng thái hoạt động
    /// </summary>
    public bool IsActive { get; set; } = true;
    
    /// <summary>
    /// Ngày tạo
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    /// <summary>
    /// Ngày cập nhật
    /// </summary>
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    /// <summary>
    /// Người tạo
    /// </summary>
    [StringLength(50)]
    public string? CreatedBy { get; set; }
    
    /// <summary>
    /// Người cập nhật
    /// </summary>
    [StringLength(50)]
    public string? UpdatedBy { get; set; }
} 