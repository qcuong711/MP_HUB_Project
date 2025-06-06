using HRM.Domain.Entities;

namespace HRM.Domain.Repositories;

/// <summary>
/// Repository interface cho thực thể nhân viên
/// Định nghĩa các phương thức truy xuất dữ liệu nhân viên
/// </summary>
public interface IEmployeeRepository
{
    /// <summary>
    /// Lấy tất cả nhân viên với phân trang
    /// </summary>
    /// <param name="pageNumber">Số trang</param>
    /// <param name="pageSize">Kích thước trang</param>
    /// <param name="searchKeyword">Từ khóa tìm kiếm</param>
    /// <param name="isActive">Lọc theo trạng thái hoạt động</param>
    /// <returns>Danh sách nhân viên và tổng số bản ghi</returns>
    Task<(IEnumerable<Employee> Items, int TotalCount)> GetAllAsync(
        int pageNumber = 1, 
        int pageSize = 10, 
        string? searchKeyword = null,
        bool? isActive = null);
    
    /// <summary>
    /// Lấy nhân viên theo ID
    /// </summary>
    /// <param name="id">ID nhân viên</param>
    /// <returns>Thông tin nhân viên hoặc null nếu không tìm thấy</returns>
    Task<Employee?> GetByIdAsync(Guid id);
    
    /// <summary>
    /// Lấy nhân viên theo mã nhân viên
    /// </summary>
    /// <param name="employeeCode">Mã nhân viên</param>
    /// <returns>Thông tin nhân viên hoặc null nếu không tìm thấy</returns>
    Task<Employee?> GetByEmployeeCodeAsync(string employeeCode);
    
    /// <summary>
    /// Lấy nhân viên theo email
    /// </summary>
    /// <param name="email">Email nhân viên</param>
    /// <returns>Thông tin nhân viên hoặc null nếu không tìm thấy</returns>
    Task<Employee?> GetByEmailAsync(string email);
    
    /// <summary>
    /// Lấy danh sách nhân viên theo phòng ban
    /// </summary>
    /// <param name="departmentId">ID phòng ban</param>
    /// <returns>Danh sách nhân viên trong phòng ban</returns>
    Task<IEnumerable<Employee>> GetByDepartmentIdAsync(Guid departmentId);
    
    /// <summary>
    /// Thêm nhân viên mới
    /// </summary>
    /// <param name="employee">Thông tin nhân viên</param>
    /// <returns>Nhân viên đã được thêm</returns>
    Task<Employee> AddAsync(Employee employee);
    
    /// <summary>
    /// Cập nhật thông tin nhân viên
    /// </summary>
    /// <param name="employee">Thông tin nhân viên cần cập nhật</param>
    /// <returns>Nhân viên đã được cập nhật</returns>
    Task<Employee> UpdateAsync(Employee employee);
    
    /// <summary>
    /// Xóa nhân viên (soft delete)
    /// </summary>
    /// <param name="id">ID nhân viên cần xóa</param>
    /// <returns>True nếu xóa thành công</returns>
    Task<bool> DeleteAsync(Guid id);
    
    /// <summary>
    /// Kiểm tra mã nhân viên đã tồn tại
    /// </summary>
    /// <param name="employeeCode">Mã nhân viên</param>
    /// <param name="excludeId">ID nhân viên cần loại trừ (dùng khi cập nhật)</param>
    /// <returns>True nếu mã đã tồn tại</returns>
    Task<bool> IsEmployeeCodeExistsAsync(string employeeCode, Guid? excludeId = null);
    
    /// <summary>
    /// Kiểm tra email đã tồn tại
    /// </summary>
    /// <param name="email">Email</param>
    /// <param name="excludeId">ID nhân viên cần loại trừ (dùng khi cập nhật)</param>
    /// <returns>True nếu email đã tồn tại</returns>
    Task<bool> IsEmailExistsAsync(string email, Guid? excludeId = null);
} 