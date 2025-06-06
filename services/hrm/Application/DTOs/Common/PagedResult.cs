namespace HRM.Application.DTOs.Common;

/// <summary>
/// DTO cho kết quả phân trang
/// Dùng để trả về dữ liệu có phân trang
/// </summary>
/// <typeparam name="T">Kiểu dữ liệu của item</typeparam>
public class PagedResult<T>
{
    /// <summary>
    /// Danh sách dữ liệu
    /// </summary>
    public IEnumerable<T> Items { get; set; } = new List<T>();
    
    /// <summary>
    /// Tổng số bản ghi
    /// </summary>
    public int TotalCount { get; set; }
    
    /// <summary>
    /// Số trang hiện tại
    /// </summary>
    public int PageNumber { get; set; }
    
    /// <summary>
    /// Kích thước trang
    /// </summary>
    public int PageSize { get; set; }
    
    /// <summary>
    /// Tổng số trang
    /// </summary>
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    
    /// <summary>
    /// Có trang trước không
    /// </summary>
    public bool HasPreviousPage => PageNumber > 1;
    
    /// <summary>
    /// Có trang sau không
    /// </summary>
    public bool HasNextPage => PageNumber < TotalPages;
} 