using HRM.Application.DTOs;
using HRM.Application.DTOs.Common;

namespace HRM.Application.Services;

/// <summary>
/// Interface cho Department Service
/// Định nghĩa các business logic liên quan đến phòng ban
/// </summary>
public interface IDepartmentService
{
    /// <summary>
    /// Lấy danh sách phòng ban với phân trang
    /// </summary>
    /// <param name="pageNumber">Số trang</param>
    /// <param name="pageSize">Kích thước trang</param>
    /// <param name="searchKeyword">Từ khóa tìm kiếm</param>
    /// <param name="isActive">Lọc theo trạng thái</param>
    /// <returns>Danh sách phòng ban có phân trang</returns>
    Task<ApiResponse<PagedResult<DepartmentDto>>> GetAllAsync(
        int pageNumber = 1, 
        int pageSize = 10, 
        string? searchKeyword = null,
        bool? isActive = null);
    
    /// <summary>
    /// Lấy thông tin phòng ban theo ID
    /// </summary>
    /// <param name="id">ID phòng ban</param>
    /// <returns>Thông tin phòng ban</returns>
    Task<ApiResponse<DepartmentDto?>> GetByIdAsync(Guid id);
    
    /// <summary>
    /// Lấy phòng ban theo mã phòng ban
    /// </summary>
    /// <param name="departmentCode">Mã phòng ban</param>
    /// <returns>Thông tin phòng ban</returns>
    Task<ApiResponse<DepartmentDto?>> GetByDepartmentCodeAsync(string departmentCode);
    
    /// <summary>
    /// Lấy cây phòng ban
    /// </summary>
    /// <returns>Cây phòng ban</returns>
    Task<ApiResponse<IEnumerable<DepartmentDto>>> GetDepartmentTreeAsync();
    
    /// <summary>
    /// Lấy danh sách phòng ban gốc
    /// </summary>
    /// <returns>Danh sách phòng ban gốc</returns>
    Task<ApiResponse<IEnumerable<DepartmentDto>>> GetRootDepartmentsAsync();
    
    /// <summary>
    /// Lấy danh sách phòng ban con
    /// </summary>
    /// <param name="parentDepartmentId">ID phòng ban cha</param>
    /// <returns>Danh sách phòng ban con</returns>
    Task<ApiResponse<IEnumerable<DepartmentDto>>> GetSubDepartmentsAsync(Guid parentDepartmentId);
    
    /// <summary>
    /// Thêm phòng ban mới
    /// </summary>
    /// <param name="departmentDto">Thông tin phòng ban</param>
    /// <param name="currentUser">Người thực hiện</param>
    /// <returns>Phòng ban đã được tạo</returns>
    Task<ApiResponse<DepartmentDto>> CreateAsync(DepartmentDto departmentDto, string? currentUser = null);
    
    /// <summary>
    /// Cập nhật thông tin phòng ban
    /// </summary>
    /// <param name="id">ID phòng ban</param>
    /// <param name="departmentDto">Thông tin cập nhật</param>
    /// <param name="currentUser">Người thực hiện</param>
    /// <returns>Phòng ban đã được cập nhật</returns>
    Task<ApiResponse<DepartmentDto>> UpdateAsync(Guid id, DepartmentDto departmentDto, string? currentUser = null);
    
    /// <summary>
    /// Xóa phòng ban
    /// </summary>
    /// <param name="id">ID phòng ban</param>
    /// <returns>Kết quả xóa</returns>
    Task<ApiResponse<bool>> DeleteAsync(Guid id);
    
    /// <summary>
    /// Kiểm tra mã phòng ban có tồn tại không
    /// </summary>
    /// <param name="departmentCode">Mã phòng ban</param>
    /// <param name="excludeId">ID loại trừ</param>
    /// <returns>True nếu đã tồn tại</returns>
    Task<bool> IsDepartmentCodeExistsAsync(string departmentCode, Guid? excludeId = null);
} 