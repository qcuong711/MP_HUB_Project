using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Thêm Ocelot
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);
builder.Services.AddOcelot(builder.Configuration);

var app = builder.Build();

// Middleware Ocelot
app.UseOcelot().Wait();

// Thông báo lỗi tiếng Việt khi không tìm thấy route
app.Use(async (context, next) =>
{
    await next();
    if (context.Response.StatusCode == 404)
    {
        context.Response.ContentType = "application/json; charset=utf-8";
        await context.Response.WriteAsync("{\"message\":\"Không tìm thấy đường dẫn hoặc dịch vụ không hoạt động!\"}");
    }
});

app.UseHttpsRedirection();

app.Run();
