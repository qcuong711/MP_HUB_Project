namespace HRM.Application.DTOs.Common;

/// <summary>
/// DTO cho API response chung
/// Dùng để chuẩn hóa format trả về của API
/// </summary>
/// <typeparam name="T">Kiểu dữ liệu trả về</typeparam>
public class ApiResponse<T>
{
    /// <summary>
    /// Trạng thái thành công
    /// </summary>
    public bool Success { get; set; }
    
    /// <summary>
    /// Thông báo
    /// </summary>
    public string Message { get; set; } = string.Empty;
    
    /// <summary>
    /// Dữ liệu trả về
    /// </summary>
    public T? Data { get; set; }
    
    /// <summary>
    /// Danh sách lỗi (nếu có)
    /// </summary>
    public List<string> Errors { get; set; } = new List<string>();
    
    /// <summary>
    /// Timestamp
    /// </summary>
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    
    /// <summary>
    /// Tạo response thành công
    /// </summary>
    /// <param name="data">Dữ liệu</param>
    /// <param name="message">Thông báo</param>
    /// <returns>ApiResponse thành công</returns>
    public static ApiResponse<T> SuccessResult(T data, string message = "Thành công")
    {
        return new ApiResponse<T>
        {
            Success = true,
            Message = message,
            Data = data
        };
    }
    
    /// <summary>
    /// Tạo response lỗi
    /// </summary>
    /// <param name="message">Thông báo lỗi</param>
    /// <param name="errors">Danh sách lỗi chi tiết</param>
    /// <returns>ApiResponse lỗi</returns>
    public static ApiResponse<T> ErrorResult(string message, List<string>? errors = null)
    {
        return new ApiResponse<T>
        {
            Success = false,
            Message = message,
            Errors = errors ?? new List<string>()
        };
    }
} 