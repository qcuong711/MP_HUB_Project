using HRM.Domain.Entities;

namespace HRM.Domain.Repositories;

/// <summary>
/// Repository interface cho thực thể phòng ban
/// Định nghĩa các phương thức truy xuất dữ liệu phòng ban
/// </summary>
public interface IDepartmentRepository
{
    /// <summary>
    /// Lấy tất cả phòng ban với phân trang
    /// </summary>
    /// <param name="pageNumber">Số trang</param>
    /// <param name="pageSize">Kích thước trang</param>
    /// <param name="searchKeyword">Từ khóa tìm kiếm</param>
    /// <param name="isActive">Lọc theo trạng thái hoạt động</param>
    /// <returns>Danh sách phòng ban và tổng số bản ghi</returns>
    Task<(IEnumerable<Department> Items, int TotalCount)> GetAllAsync(
        int pageNumber = 1, 
        int pageSize = 10, 
        string? searchKeyword = null,
        bool? isActive = null);
    
    /// <summary>
    /// Lấy phòng ban theo ID
    /// </summary>
    /// <param name="id">ID phòng ban</param>
    /// <returns>Thông tin phòng ban hoặc null nếu không tìm thấy</returns>
    Task<Department?> GetByIdAsync(Guid id);
    
    /// <summary>
    /// Lấy phòng ban theo mã phòng ban
    /// </summary>
    /// <param name="departmentCode">Mã phòng ban</param>
    /// <returns>Thông tin phòng ban hoặc null nếu không tìm thấy</returns>
    Task<Department?> GetByDepartmentCodeAsync(string departmentCode);
    
    /// <summary>
    /// Lấy các phòng ban con theo ID phòng ban cha
    /// </summary>
    /// <param name="parentDepartmentId">ID phòng ban cha</param>
    /// <returns>Danh sách phòng ban con</returns>
    Task<IEnumerable<Department>> GetSubDepartmentsAsync(Guid parentDepartmentId);
    
    /// <summary>
    /// Lấy tất cả phòng ban gốc (không có phòng ban cha)
    /// </summary>
    /// <returns>Danh sách phòng ban gốc</returns>
    Task<IEnumerable<Department>> GetRootDepartmentsAsync();
    
    /// <summary>
    /// Lấy cây phòng ban (bao gồm tất cả phòng ban con)
    /// </summary>
    /// <returns>Cây phòng ban</returns>
    Task<IEnumerable<Department>> GetDepartmentTreeAsync();
    
    /// <summary>
    /// Thêm phòng ban mới
    /// </summary>
    /// <param name="department">Thông tin phòng ban</param>
    /// <returns>Phòng ban đã được thêm</returns>
    Task<Department> AddAsync(Department department);
    
    /// <summary>
    /// Cập nhật thông tin phòng ban
    /// </summary>
    /// <param name="department">Thông tin phòng ban cần cập nhật</param>
    /// <returns>Phòng ban đã được cập nhật</returns>
    Task<Department> UpdateAsync(Department department);
    
    /// <summary>
    /// Xóa phòng ban (soft delete)
    /// </summary>
    /// <param name="id">ID phòng ban cần xóa</param>
    /// <returns>True nếu xóa thành công</returns>
    Task<bool> DeleteAsync(Guid id);
    
    /// <summary>
    /// Kiểm tra mã phòng ban đã tồn tại
    /// </summary>
    /// <param name="departmentCode">Mã phòng ban</param>
    /// <param name="excludeId">ID phòng ban cần loại trừ (dùng khi cập nhật)</param>
    /// <returns>True nếu mã đã tồn tại</returns>
    Task<bool> IsDepartmentCodeExistsAsync(string departmentCode, Guid? excludeId = null);
    
    /// <summary>
    /// Kiểm tra phòng ban có nhân viên hay không
    /// </summary>
    /// <param name="departmentId">ID phòng ban</param>
    /// <returns>True nếu có nhân viên</returns>
    Task<bool> HasEmployeesAsync(Guid departmentId);
    
    /// <summary>
    /// Kiểm tra phòng ban có phòng ban con hay không
    /// </summary>
    /// <param name="departmentId">ID phòng ban</param>
    /// <returns>True nếu có phòng ban con</returns>
    Task<bool> HasSubDepartmentsAsync(Guid departmentId);
} 