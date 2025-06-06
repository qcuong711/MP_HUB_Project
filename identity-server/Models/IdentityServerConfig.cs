namespace IdentityServer.Models
{
    public class IdentityServerConfig
    {
        public string IssuerUri { get; set; } = "http://localhost:5001";
        public int Port { get; set; } = 5001;
        public Dictionary<string, ClientConfig> Clients { get; set; } = new();
        public List<TestUserConfig> TestUsers { get; set; } = new();
    }

    public class ClientConfig
    {
        public string ClientId { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
        public string ClientSecret { get; set; } = string.Empty;
        public List<string> RedirectUris { get; set; } = new();
        public List<string> PostLogoutRedirectUris { get; set; } = new();
        public List<string> AllowedCorsOrigins { get; set; } = new();
    }

    public class TestUserConfig
    {
        public string SubjectId { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = "User";
    }

    public class CORSConfig
    {
        public List<string> AllowedOrigins { get; set; } = new();
    }

    public class OAuthConfig
    {
        public GoogleConfig Google { get; set; } = new();
    }

    public class GoogleConfig
    {
        public string ClientId { get; set; } = string.Empty;
        public string ClientSecret { get; set; } = string.Empty;
    }
} 