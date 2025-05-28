import NextAuth from "next-auth";
import { Issuer } from "openid-client";

const identityServerUrl = process.env.IDENTITY_SERVER_URL || "http://localhost:5001";

const handler = NextAuth({
  providers: [
    {
      id: "identityserver",
      name: "Đăng nhập hệ thống",
      type: "oauth",
      wellKnown: `${identityServerUrl}/.well-known/openid-configuration`,
      clientId: "gateway",
      clientSecret: "secret",
      authorization: { 
        params: { 
          scope: "openid profile master-data hrm",
          response_type: "code",
          prompt: "login"
        } 
      },
      checks: ["pkce", "state"],
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.preferred_username || profile.email,
          email: profile.email,
        };
      },
      httpOptions: {
        timeout: 10000, // 10 seconds
      },
    },
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as any;
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Cho phép redirect đến dashboard sau khi đăng nhập
      if (url.startsWith(baseUrl)) return url;
      // Cho phép redirect đến các URL bên ngoài nếu cần
      else if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST }; 