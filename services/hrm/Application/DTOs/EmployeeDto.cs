using System.ComponentModel.DataAnnotations;

namespace HRM.Application.DTOs;

/// <summary>
/// DTO cho thông tin nhân viên
/// Dùng để truyền dữ liệu giữa các layer
/// </summary>
public class EmployeeDto
{
    /// <summary>
    /// Mã định danh nhân viên
    /// </summary>
    public Guid Id { get; set; }
    
    /// <summary>
    /// Mã nhân viên duy nhất
    /// </summary>
    [Required(ErrorMessage = "Mã nhân viên là bắt buộc")]
    [StringLength(20, ErrorMessage = "Mã nhân viên không được vượt quá 20 ký tự")]
    public string EmployeeCode { get; set; } = string.Empty;
    
    /// <summary>
    /// Họ và tên nhân viên
    /// </summary>
    [Required(ErrorMessage = "Họ tên là bắt buộc")]
    [StringLength(100, ErrorMessage = "Họ tên không được vượt quá 100 ký tự")]
    public string FullName { get; set; } = string.Empty;
    
    /// <summary>
    /// Email nhân viên
    /// </summary>
    [Required(ErrorMessage = "Email là bắt buộc")]
    [EmailAddress(ErrorMessage = "Email không đúng định dạng")]
    [StringLength(100, ErrorMessage = "Email không được vượt quá 100 ký tự")]
    public string Email { get; set; } = string.Empty;
    
    /// <summary>
    /// Số điện thoại
    /// </summary>
    [StringLength(20, ErrorMessage = "Số điện thoại không được vượt quá 20 ký tự")]
    public string? PhoneNumber { get; set; }
    
    /// <summary>
    /// Ngày sinh
    /// </summary>
    public DateTime? DateOfBirth { get; set; }
    
    /// <summary>
    /// Ngày vào làm
    /// </summary>
    [Required(ErrorMessage = "Ngày vào làm là bắt buộc")]
    public DateTime HireDate { get; set; }
    
    /// <summary>
    /// Chức vụ
    /// </summary>
    [StringLength(50, ErrorMessage = "Chức vụ không được vượt quá 50 ký tự")]
    public string? Position { get; set; }
    
    /// <summary>
    /// Phòng ban ID
    /// </summary>
    public Guid? DepartmentId { get; set; }
    
    /// <summary>
    /// Tên phòng ban
    /// </summary>
    public string? DepartmentName { get; set; }
    
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
} 