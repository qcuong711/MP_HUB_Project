using Duende.IdentityServer;
using Duende.IdentityServer.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Cấu hình URL
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5001); // Listen on port 5001
});

// Cấu hình để tắt HTTPS redirection
builder.Services.AddHttpsRedirection(options =>
{
    options.HttpsPort = 5001;
});

// Thêm CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5001")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Thêm IdentityServer
builder.Services.AddIdentityServer(options =>
{
    options.IssuerUri = "http://localhost:5001";
    options.Discovery.ShowApiScopes = true;
    options.Discovery.ShowClaims = true;
    options.Discovery.ShowEndpoints = true;
    options.Discovery.ShowIdentityScopes = true;
    options.Discovery.ShowExtensionGrantTypes = true;
    options.Discovery.ShowKeySet = true;
    options.Discovery.ShowResponseTypes = true;
    options.Discovery.ShowTokenEndpointAuthenticationMethods = true;

    // Cấu hình bảo mật
    options.Authentication = new Duende.IdentityServer.Configuration.AuthenticationOptions
    {
        CookieLifetime = TimeSpan.FromHours(10),
        CookieSlidingExpiration = true,
        RequireAuthenticatedUserForSignOutMessage = true
    };

    // Cấu hình events
    options.Events.RaiseErrorEvents = true;
    options.Events.RaiseFailureEvents = true;
    options.Events.RaiseInformationEvents = true;
    options.Events.RaiseSuccessEvents = true;
})
    .AddInMemoryClients(new List<Client>
    {
        new Client
        {
            ClientId = "gateway",
            ClientName = "Frontend Gateway",
            AllowedGrantTypes = GrantTypes.Code,
            RequirePkce = true,
            RequireClientSecret = true,
            ClientSecrets = new List<Secret> { new Secret("secret".Sha256()) },
            AllowedScopes = new List<string> { 
                IdentityServerConstants.StandardScopes.OpenId,
                IdentityServerConstants.StandardScopes.Profile,
                IdentityServerConstants.StandardScopes.Email,
                "master-data", 
                "hrm" 
            },
            RedirectUris = new List<string> { 
                "http://localhost:3000/api/auth/callback/identityserver",
                "http://localhost:3000/dashboard"
            },
            PostLogoutRedirectUris = new List<string> { 
                "http://localhost:3000",
                "http://localhost:3000/dashboard"
            },
            AllowedCorsOrigins = new List<string> { "http://localhost:3000" }
        }
    })
    .AddInMemoryIdentityResources(new List<IdentityResource>
    {
        new IdentityResources.OpenId(),
        new IdentityResources.Profile(),
        new IdentityResources.Email()
    })
    .AddInMemoryApiScopes(new List<ApiScope>
    {
        new ApiScope("master-data", "Quản lý dữ liệu dùng chung"),
        new ApiScope("hrm", "Quản lý nhân sự")
    })
    .AddTestUsers(new List<Duende.IdentityServer.Test.TestUser>
    {
        new Duende.IdentityServer.Test.TestUser
        {
            SubjectId = "1",
            Username = "admin",
            Password = "123456",
            Claims = new List<Claim> 
            { 
                new Claim("sub", "1"),
                new Claim("name", "Administrator"),
                new Claim("given_name", "Admin"),
                new Claim("family_name", "User"),
                new Claim("email", "admin@example.com"),
                new Claim("role", "Admin"),
                new Claim("preferred_username", "admin")
            }
        }
    });

// Add services to the container.
builder.Services.AddControllersWithViews();

// Thêm cấu hình Authentication với Google
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "Cookies";
    options.DefaultChallengeScheme = "oidc";
})
.AddCookie("Cookies", options =>
{
    options.Cookie.SameSite = SameSiteMode.Lax;
    options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
    options.LoginPath = "/Account/Login";
    options.LogoutPath = "/Account/Logout";
    options.AccessDeniedPath = "/Account/AccessDenied";
})
.AddGoogle(options =>
{
    // Cấu hình Google OAuth - Thay thế bằng Client ID và Secret thực tế
    // Để lấy Client ID và Secret:
    // 1. Truy cập Google Cloud Console
    // 2. Tạo project mới hoặc chọn project hiện có
    // 3. Bật Google+ API
    // 4. Tạo OAuth 2.0 credentials
    // 5. Thêm redirect URI: http://localhost:5001/signin-google
    
    options.ClientId = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
    options.ClientSecret = "YOUR_GOOGLE_CLIENT_SECRET";
    
    // Thêm scopes cần thiết
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");
    
    // Cấu hình events để xử lý callback
    options.Events.OnCreatingTicket = async context =>
    {
        var request = context.HttpContext.Request;
        var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
        
        logger.LogInformation("Google authentication successful for user: {Email}", 
            context.Principal?.FindFirst(ClaimTypes.Email)?.Value);
        
        await Task.CompletedTask;
    };
})
.AddOpenIdConnect("oidc", options =>
{
    options.Authority = "http://localhost:5001";
    options.ClientId = "gateway";
    options.ClientSecret = "secret";
    options.ResponseType = "code";
    options.SaveTokens = true;
    
    // Cho phép HTTP trong development
    options.RequireHttpsMetadata = false;
    
    // Cấu hình thêm
    options.UseTokenLifetime = true;
    options.GetClaimsFromUserInfoEndpoint = true;
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");
    options.Scope.Add("master-data");
    options.Scope.Add("hrm");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// Tắt HTTPS redirection
// app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseRouting();

// Sử dụng CORS
app.UseCors("AllowFrontend");

// Thêm Authentication middleware
app.UseAuthentication();

// Sử dụng IdentityServer
app.UseIdentityServer();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Thêm endpoint để kiểm tra server có hoạt động không
app.MapGet("/health", () => "Identity Server is running!");

app.Run();
