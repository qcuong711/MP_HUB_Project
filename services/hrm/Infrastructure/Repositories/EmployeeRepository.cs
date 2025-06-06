using Microsoft.EntityFrameworkCore;
using HRM.Domain.Entities;
using HRM.Domain.Repositories;
using HRM.Infrastructure.Data;

namespace HRM.Infrastructure.Repositories;

/// <summary>
/// Implementation của IEmployeeRepository
/// Xử lý các thao tác dữ liệu với Employee
/// </summary>
public class EmployeeRepository : IEmployeeRepository
{
    private readonly HrmDbContext _context;
    
    public EmployeeRepository(HrmDbContext context)
    {
        _context = context;
    }
    
    /// <summary>
    /// Lấy tất cả nhân viên với phân trang
    /// </summary>
    public async Task<(IEnumerable<Employee> Items, int TotalCount)> GetAllAsync(
        int pageNumber = 1, 
        int pageSize = 10, 
        string? searchKeyword = null, 
        bool? isActive = null)
    {
        var query = _context.Employees.AsQueryable();
        
        // Lọc theo trạng thái
        if (isActive.HasValue)
        {
            query = query.Where(e => e.IsActive == isActive.Value);
        }
        
        // Tìm kiếm theo từ khóa
        if (!string.IsNullOrWhiteSpace(searchKeyword))
        {
            query = query.Where(e => 
                e.FullName.Contains(searchKeyword) ||
                e.EmployeeCode.Contains(searchKeyword) ||
                e.Email.Contains(searchKeyword));
        }
        
        var totalCount = await query.CountAsync();
        
        var items = await query
            .OrderBy(e => e.EmployeeCode)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        
        return (items, totalCount);
    }
    
    /// <summary>
    /// Lấy nhân viên theo ID
    /// </summary>
    public async Task<Employee?> GetByIdAsync(Guid id)
    {
        return await _context.Employees
            .FirstOrDefaultAsync(e => e.Id == id);
    }
    
    /// <summary>
    /// Lấy nhân viên theo mã nhân viên
    /// </summary>
    public async Task<Employee?> GetByEmployeeCodeAsync(string employeeCode)
    {
        return await _context.Employees
            .FirstOrDefaultAsync(e => e.EmployeeCode == employeeCode);
    }
    
    /// <summary>
    /// Lấy nhân viên theo email
    /// </summary>
    public async Task<Employee?> GetByEmailAsync(string email)
    {
        return await _context.Employees
            .FirstOrDefaultAsync(e => e.Email == email);
    }
    
    /// <summary>
    /// Lấy danh sách nhân viên theo phòng ban
    /// </summary>
    public async Task<IEnumerable<Employee>> GetByDepartmentIdAsync(Guid departmentId)
    {
        return await _context.Employees
            .Where(e => e.DepartmentId == departmentId && e.IsActive)
            .OrderBy(e => e.EmployeeCode)
            .ToListAsync();
    }
    
    /// <summary>
    /// Thêm nhân viên mới
    /// </summary>
    public async Task<Employee> AddAsync(Employee employee)
    {
        employee.Id = Guid.NewGuid();
        employee.CreatedAt = DateTime.UtcNow;
        employee.UpdatedAt = DateTime.UtcNow;
        
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();
        
        return employee;
    }
    
    /// <summary>
    /// Cập nhật thông tin nhân viên
    /// </summary>
    public async Task<Employee> UpdateAsync(Employee employee)
    {
        employee.UpdatedAt = DateTime.UtcNow;
        
        _context.Employees.Update(employee);
        await _context.SaveChangesAsync();
        
        return employee;
    }
    
    /// <summary>
    /// Xóa nhân viên (soft delete)
    /// </summary>
    public async Task<bool> DeleteAsync(Guid id)
    {
        var employee = await GetByIdAsync(id);
        if (employee == null)
            return false;
        
        employee.IsActive = false;
        employee.UpdatedAt = DateTime.UtcNow;
        
        await _context.SaveChangesAsync();
        return true;
    }
    
    /// <summary>
    /// Kiểm tra mã nhân viên đã tồn tại
    /// </summary>
    public async Task<bool> IsEmployeeCodeExistsAsync(string employeeCode, Guid? excludeId = null)
    {
        var query = _context.Employees.Where(e => e.EmployeeCode == employeeCode);
        
        if (excludeId.HasValue)
        {
            query = query.Where(e => e.Id != excludeId.Value);
        }
        
        return await query.AnyAsync();
    }
    
    /// <summary>
    /// Kiểm tra email đã tồn tại
    /// </summary>
    public async Task<bool> IsEmailExistsAsync(string email, Guid? excludeId = null)
    {
        var query = _context.Employees.Where(e => e.Email == email);
        
        if (excludeId.HasValue)
        {
            query = query.Where(e => e.Id != excludeId.Value);
        }
        
        return await query.AnyAsync();
    }
} 