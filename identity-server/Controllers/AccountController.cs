using Duende.IdentityServer.Services;
using Duende.IdentityServer.Test;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.Extensions.Logging;

namespace IdentityServer.Controllers
{
    public class AccountController : Controller
    {
        private readonly TestUserStore _users;
        private readonly IIdentityServerInteractionService _interaction;
        private readonly ILogger<AccountController> _logger;
        
        // Static list để lưu trữ users đăng ký mới
        private static List<TestUser> _registeredUsers = new List<TestUser>();

        public AccountController(
            TestUserStore users, 
            IIdentityServerInteractionService interaction,
            ILogger<AccountController> logger)
        {
            _users = users;
            _interaction = interaction;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Login(string returnUrl)
        {
            var context = await _interaction.GetAuthorizationContextAsync(returnUrl);
            if (context != null)
            {
                ViewData["ReturnUrl"] = returnUrl;
                return View();
            }
            
            _logger.LogWarning("Invalid return URL: {ReturnUrl}", returnUrl);
            return View("Error");
        }

        [HttpPost]
        public async Task<IActionResult> Login(string username, string password, string returnUrl)
        {
            var context = await _interaction.GetAuthorizationContextAsync(returnUrl);
            
            // Kiểm tra user trong TestUserStore trước
            if (_users.ValidateCredentials(username, password))
            {
                var user = _users.FindByUsername(username);
                var claims = new List<Claim>
                {
                    new Claim("sub", user.SubjectId),
                    new Claim("name", user.Username),
                    new Claim("email", user.Claims.FirstOrDefault(c => c.Type == "email")?.Value ?? ""),
                    new Claim("role", user.Claims.FirstOrDefault(c => c.Type == "role")?.Value ?? "")
                };

                var ci = new ClaimsIdentity(claims, "password", "name", "role");
                var cp = new ClaimsPrincipal(ci);

                await HttpContext.SignInAsync(cp);

                if (context != null)
                {
                    return Redirect(returnUrl);
                }

                return Redirect("http://localhost:3001/dashboard");
            }
            
            // Kiểm tra user trong danh sách đăng ký
            var registeredUser = _registeredUsers.FirstOrDefault(u => u.Username == username && u.Password == password);
            if (registeredUser != null)
            {
                var claims = new List<Claim>
                {
                    new Claim("sub", registeredUser.SubjectId),
                    new Claim("name", registeredUser.Username),
                    new Claim("email", registeredUser.Claims.FirstOrDefault(c => c.Type == "email")?.Value ?? ""),
                    new Claim("role", registeredUser.Claims.FirstOrDefault(c => c.Type == "role")?.Value ?? "")
                };

                var ci = new ClaimsIdentity(claims, "password", "name", "role");
                var cp = new ClaimsPrincipal(ci);

                await HttpContext.SignInAsync(cp);

                if (context != null)
                {
                    return Redirect(returnUrl);
                }

                return Redirect("http://localhost:3001/dashboard");
            }

            ViewData["ReturnUrl"] = returnUrl;
            ViewData["Error"] = "Tài khoản hoặc mật khẩu không đúng!";
            return View();
        }

        [HttpGet]
        public IActionResult Register(string returnUrl)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        public IActionResult Register(string username, string email, string password, string confirmPassword, string returnUrl)
        {
            try
            {
                // Validate input
                if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
                {
                    ViewData["Error"] = "Vui lòng điền đầy đủ thông tin.";
                    ViewData["ReturnUrl"] = returnUrl;
                    return View();
                }

                if (password != confirmPassword)
                {
                    ViewData["Error"] = "Mật khẩu xác nhận không khớp.";
                    ViewData["ReturnUrl"] = returnUrl;
                    return View();
                }

                if (password.Length < 6)
                {
                    ViewData["Error"] = "Mật khẩu phải có ít nhất 6 ký tự.";
                    ViewData["ReturnUrl"] = returnUrl;
                    return View();
                }

                // Check if user already exists in TestUserStore
                var existingUser = _users.FindByUsername(username);
                if (existingUser != null)
                {
                    ViewData["Error"] = "Tên tài khoản đã được sử dụng.";
                    ViewData["ReturnUrl"] = returnUrl;
                    return View();
                }
                
                // Check if user already exists in registered users
                var existingRegisteredUser = _registeredUsers.FirstOrDefault(u => u.Username == username);
                if (existingRegisteredUser != null)
                {
                    ViewData["Error"] = "Tên tài khoản đã được sử dụng.";
                    ViewData["ReturnUrl"] = returnUrl;
                    return View();
                }

                // Create new user
                var newUser = new TestUser
                {
                    SubjectId = Guid.NewGuid().ToString(),
                    Username = username,
                    Password = password,
                    Claims = new List<Claim>
                    {
                        new Claim("email", email),
                        new Claim("role", "user")
                    }
                };

                // Add user to registered users list
                _registeredUsers.Add(newUser);
                
                _logger.LogInformation("User {Username} registered successfully", username);

                // Redirect to login with success message
                return RedirectToAction("Login", new { returnUrl, registered = "true" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error registering user {Username}", username);
                ViewData["Error"] = "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.";
                ViewData["ReturnUrl"] = returnUrl;
                return View();
            }
        }

        [HttpPost]
        public IActionResult LoginWithGoogle(string returnUrl)
        {
            var redirectUrl = Url.Action("GoogleCallback", "Account", new { returnUrl });
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            return Challenge(properties, "Google");
        }

        [HttpGet]
        public async Task<IActionResult> GoogleCallback(string returnUrl)
        {
            var result = await HttpContext.AuthenticateAsync("Google");
            if (!result.Succeeded)
            {
                ViewData["Error"] = "Đăng nhập Google thất bại.";
                ViewData["ReturnUrl"] = returnUrl;
                return View("Login");
            }

            var claims = result.Principal?.Claims.ToList() ?? new List<Claim>();
            var email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value ?? "";
            var name = claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value ?? "";
            var googleId = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value ?? "";

            // Find existing user by email
            var user = _registeredUsers.FirstOrDefault(u => 
                u.Claims.Any(c => c.Type == "email" && c.Value == email));
            
            if (user == null)
            {
                // Create new user from Google account
                user = new TestUser
                {
                    SubjectId = Guid.NewGuid().ToString(),
                    Username = email,
                    Password = "", // No password for Google users
                    Claims = new List<Claim>
                    {
                        new Claim("email", email),
                        new Claim("name", name),
                        new Claim("role", "user"),
                        new Claim("google_id", googleId)
                    }
                };

                _registeredUsers.Add(user);
                _logger.LogInformation("New Google user created: {Email}", email);
            }

            var userClaims = new List<Claim>
            {
                new Claim("sub", user.SubjectId),
                new Claim("name", user.Username),
                new Claim("email", email),
                new Claim("role", user.Claims.FirstOrDefault(c => c.Type == "role")?.Value ?? "user")
            };

            var ci = new ClaimsIdentity(userClaims, "google", "name", "role");
            var cp = new ClaimsPrincipal(ci);

            await HttpContext.SignInAsync(cp);

            if (!string.IsNullOrEmpty(returnUrl))
            {
                return Redirect(returnUrl);
            }

            return Redirect("http://localhost:3001/dashboard");
        }

        [HttpGet]
        public async Task<IActionResult> Logout(string logoutId)
        {
            await HttpContext.SignOutAsync();
            var context = await _interaction.GetLogoutContextAsync(logoutId);
            
            if (context?.PostLogoutRedirectUri != null)
            {
                return Redirect(context.PostLogoutRedirectUri);
            }
            
            return Redirect("http://localhost:3001/dashboard");
        }
    }
} 