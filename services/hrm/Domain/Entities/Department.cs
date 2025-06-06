using System.ComponentModel.DataAnnotations;

namespace HRM.Domain.Entities;

/// <summary>
/// Entity phòng ban - Domain layer
/// Đại diện cho thực thể phòng ban trong hệ thống HRM
/// </summary>
public class Department
{
    /// <summary>
    /// Mã định danh phòng ban
    /// </summary>
    public Guid Id { get; set; }
    
    /// <summary>
    /// Mã phòng ban duy nhất
    /// </summary>
    [Required]
    [StringLength(20)]
    public string DepartmentCode { get; set; } = string.Empty;
    
    /// <summary>
    /// Tên phòng ban
    /// </summary>
    [Required]
    [StringLength(100)]
    public string DepartmentName { get; set; } = string.Empty;
    
    /// <summary>
    /// Mô tả phòng ban
    /// </summary>
    [StringLength(500)]
    public string? Description { get; set; }
    
    /// <summary>
    /// Phòng ban cha (nếu có)
    /// </summary>
    public Guid? ParentDepartmentId { get; set; }
    
    /// <summary>
    /// Trưởng phòng
    /// </summary>
    public Guid? ManagerId { get; set; }
    
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
    
    /// <summary>
    /// Danh sách nhân viên trong phòng ban
    /// </summary>
    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
    
    /// <summary>
    /// Phòng ban cha
    /// </summary>
    public virtual Department? ParentDepartment { get; set; }
    
    /// <summary>
    /// Các phòng ban con
    /// </summary>
    public virtual ICollection<Department> SubDepartments { get; set; } = new List<Department>();
} 