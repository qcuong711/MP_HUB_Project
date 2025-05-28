using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Cấu hình xác thực JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "http://identity-server:80";
        options.Audience = "hrm";
        options.RequireHttpsMetadata = false;
    });
builder.Services.AddAuthorization(options =>
{
    options.DefaultPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});

// Thêm Swagger cho .NET 8
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

// Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Thông báo lỗi tiếng Việt khi không có quyền
app.Use(async (context, next) =>
{
    await next();
    if (context.Response.StatusCode == 401)
    {
        context.Response.ContentType = "application/json; charset=utf-8";
        await context.Response.WriteAsync("{\"message\":\"Bạn chưa đăng nhập hoặc token không hợp lệ!\"}");
    }
    else if (context.Response.StatusCode == 403)
    {
        context.Response.ContentType = "application/json; charset=utf-8";
        await context.Response.WriteAsync("{\"message\":\"Bạn không có quyền truy cập tài nguyên này!\"}");
    }
});

// Bảo vệ API mẫu
app.MapGet("/weatherforecast", [Authorize]() =>
{
    var summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
