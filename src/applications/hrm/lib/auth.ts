import { APP_CONFIG, getIdentityServerUrl, getAppUrl } from './config';

// OAuth Configuration từ centralized config
export const IDENTITY_SERVER_CONFIG = {
  authority: APP_CONFIG.identityServer.authority,
  client_id: APP_CONFIG.identityServer.clientId,
  redirect_uri: getAppUrl('/dashboard'),
  post_logout_redirect_uri: getAppUrl(''),
  response_type: 'code',
  scope: APP_CONFIG.identityServer.scope,
  state: 'hrm-app',
  nonce: 'hrm-nonce'
};

// Tạo URL đăng nhập OAuth
export function createLoginUrl(): string {
  const params = new URLSearchParams({
    client_id: IDENTITY_SERVER_CONFIG.client_id,
    redirect_uri: IDENTITY_SERVER_CONFIG.redirect_uri,
    response_type: IDENTITY_SERVER_CONFIG.response_type,
    scope: IDENTITY_SERVER_CONFIG.scope,
    state: IDENTITY_SERVER_CONFIG.state,
    nonce: IDENTITY_SERVER_CONFIG.nonce
  });

  return getIdentityServerUrl(`${APP_CONFIG.oauth.authorizeEndpoint}?${params.toString()}`);
}

// Tạo URL đăng xuất
export function createLogoutUrl(): string {
  const params = new URLSearchParams({
    post_logout_redirect_uri: IDENTITY_SERVER_CONFIG.post_logout_redirect_uri,
    id_token_hint: getStoredIdToken() || ''
  });

  return getIdentityServerUrl(`${APP_CONFIG.oauth.endSessionEndpoint}?${params.toString()}`);
}

// Exchange authorization code for tokens
export async function exchangeCodeForTokens(code: string): Promise<any> {
  const response = await fetch(getIdentityServerUrl(APP_CONFIG.oauth.tokenEndpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: APP_CONFIG.identityServer.clientId,
      code: code,
      redirect_uri: getAppUrl('/dashboard')
    })
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.status}`);
  }

  return response.json();
}

// Get user info from Identity Server
export async function getUserInfo(accessToken: string): Promise<any> {
  const response = await fetch(getIdentityServerUrl(APP_CONFIG.oauth.userInfoEndpoint), {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`Get user info failed: ${response.status}`);
  }

  return response.json();
}

// Lấy stored token
function getStoredIdToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('id_token');
  }
  return null;
}

// Lưu trữ token sau khi đăng nhập thành công
export function storeTokens(tokens: {
  access_token: string;
  id_token: string;
  refresh_token?: string;
}): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('id_token', tokens.id_token);
    if (tokens.refresh_token) {
      localStorage.setItem('refresh_token', tokens.refresh_token);
    }
  }
}

// Kiểm tra trạng thái đăng nhập
export function isAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    return !!token;
  }
  return false;
}

// Xóa tokens khi đăng xuất
export function clearTokens(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('code_verifier');
  }
}