using HRM.Application.DTOs;
using HRM.Application.DTOs.Common;

namespace HRM.Application.Services;

/// <summary>
/// Interface cho Employee Service
/// Định nghĩa các business logic liên quan đến nhân viên
/// </summary>
public interface IEmployeeService
{
    /// <summary>
    /// Lấy danh sách nhân viên với phân trang
    /// </summary>
    /// <param name="pageNumber">Số trang</param>
    /// <param name="pageSize">Kích thước trang</param>
    /// <param name="searchKeyword">Từ khóa tìm kiếm</param>
    /// <param name="isActive">Lọc theo trạng thái</param>
    /// <returns>Danh sách nhân viên có phân trang</returns>
    Task<ApiResponse<PagedResult<EmployeeDto>>> GetAllAsync(
        int pageNumber = 1, 
        int pageSize = 10, 
        string? searchKeyword = null,
        bool? isActive = null);
    
    /// <summary>
    /// Lấy thông tin nhân viên theo ID
    /// </summary>
    /// <param name="id">ID nhân viên</param>
    /// <returns>Thông tin nhân viên</returns>
    Task<ApiResponse<EmployeeDto?>> GetByIdAsync(Guid id);
    
    /// <summary>
    /// Lấy nhân viên theo mã nhân viên
    /// </summary>
    /// <param name="employeeCode">Mã nhân viên</param>
    /// <returns>Thông tin nhân viên</returns>
    Task<ApiResponse<EmployeeDto?>> GetByEmployeeCodeAsync(string employeeCode);
    
    /// <summary>
    /// Lấy danh sách nhân viên theo phòng ban
    /// </summary>
    /// <param name="departmentId">ID phòng ban</param>
    /// <returns>Danh sách nhân viên</returns>
    Task<ApiResponse<IEnumerable<EmployeeDto>>> GetByDepartmentIdAsync(Guid departmentId);
    
    /// <summary>
    /// Thêm nhân viên mới
    /// </summary>
    /// <param name="employeeDto">Thông tin nhân viên</param>
    /// <param name="currentUser">Người thực hiện</param>
    /// <returns>Nhân viên đã được tạo</returns>
    Task<ApiResponse<EmployeeDto>> CreateAsync(EmployeeDto employeeDto, string? currentUser = null);
    
    /// <summary>
    /// Cập nhật thông tin nhân viên
    /// </summary>
    /// <param name="id">ID nhân viên</param>
    /// <param name="employeeDto">Thông tin cập nhật</param>
    /// <param name="currentUser">Người thực hiện</param>
    /// <returns>Nhân viên đã được cập nhật</returns>
    Task<ApiResponse<EmployeeDto>> UpdateAsync(Guid id, EmployeeDto employeeDto, string? currentUser = null);
    
    /// <summary>
    /// Xóa nhân viên
    /// </summary>
    /// <param name="id">ID nhân viên</param>
    /// <returns>Kết quả xóa</returns>
    Task<ApiResponse<bool>> DeleteAsync(Guid id);
    
    /// <summary>
    /// Kiểm tra mã nhân viên có tồn tại không
    /// </summary>
    /// <param name="employeeCode">Mã nhân viên</param>
    /// <param name="excludeId">ID loại trừ</param>
    /// <returns>True nếu đã tồn tại</returns>
    Task<bool> IsEmployeeCodeExistsAsync(string employeeCode, Guid? excludeId = null);
    
    /// <summary>
    /// Kiểm tra email có tồn tại không
    /// </summary>
    /// <param name="email">Email</param>
    /// <param name="excludeId">ID loại trừ</param>
    /// <returns>True nếu đã tồn tại</returns>
    Task<bool> IsEmailExistsAsync(string email, Guid? excludeId = null);
} 