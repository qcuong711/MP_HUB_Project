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
                    // Nếu có returnUrl từ context, sử dụng nó
                    return Redirect(returnUrl);
                }

                // Nếu không có context, chuyển về dashboard
                return Redirect("http://localhost:3000/dashboard");
            }

            ViewData["ReturnUrl"] = returnUrl;
            ViewData["Error"] = "Tài khoản hoặc mật khẩu không đúng!";
            return View();
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
            
            // Nếu không có context, chuyển về dashboard
            return Redirect("http://localhost:3000/dashboard");
        }
    }
} 