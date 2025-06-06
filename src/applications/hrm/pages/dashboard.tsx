import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import HrmInfo from '../components/HrmInfo';
import { storeTokens, isAuthenticated, createLogoutUrl, clearTokens, exchangeCodeForTokens, getUserInfo } from '../lib/auth';

interface UserInfo {
  name?: string;
  email?: string;
  sub?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Kiểm tra nếu có authorization code trong URL (từ Identity Server callback)
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      if (code && state === 'hrm-app') {
        try {
          // Exchange code for tokens using config-based helper
          const tokens = await exchangeCodeForTokens(code);
          storeTokens(tokens);
          
          // Get user info using config-based helper
          const userInfo = await getUserInfo(tokens.access_token);
          setUser(userInfo);

          // Clean URL (remove query parameters)
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error('Auth callback error:', error);
          router.push('/');
        }
      } else if (isAuthenticated()) {
        // User đã đăng nhập trước đó, lấy thông tin user
        try {
          const token = localStorage.getItem('access_token');
          if (token) {
            const userInfo = await getUserInfo(token);
            setUser(userInfo);
          }
        } catch (error) {
          console.error('User info error:', error);
          clearTokens();
          router.push('/');
        }
      } else {
        // Chưa đăng nhập, redirect về homepage
        router.push('/');
        return;
      }

      setLoading(false);
    };

    handleAuthCallback();
  }, [router]);

  const handleLogout = () => {
    clearTokens();
    window.location.href = createLogoutUrl();
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #10b981',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#64748b' }}>Đang xác thực...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '24px'
            }}>
              👥
            </div>
            <div>
              <h1 style={{
                margin: 0,
                color: '#1e293b',
                fontSize: '28px',
                fontWeight: '700'
              }}>
                Dashboard HRM
              </h1>
              <p style={{
                margin: '4px 0 0 0',
                color: '#64748b',
                fontSize: '16px'
              }}>
                Chào mừng, {user?.name || user?.email || 'User'}!
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              padding: '8px 16px',
              backgroundColor: '#f0fdf4',
              color: '#166534',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              border: '1px solid #bbf7d0'
            }}>
              🟢 {user?.email}
            </div>
            <Link 
              href="/"
              style={{
                padding: '8px 16px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                border: '1px solid #e5e7eb'
              }}
            >
              ← Trang chủ
            </Link>
            <button 
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          fontSize: '14px',
          color: '#64748b'
        }}>
          <span style={{
            backgroundColor: '#dcfce7',
            color: '#166534',
            padding: '4px 8px',
            borderRadius: '4px',
            fontWeight: '500'
          }}>
            ✅ Đã xác thực
          </span>
          <span>Port: 3001</span>
          <span>•</span>
          <span>OAuth 2.0 + OIDC</span>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '24px'
        }}>
          {/* Thông tin nhân viên */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#1e293b', fontSize: '18px' }}>
              📊 Thống kê nhân viên
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Tổng nhân viên:</span>
                <span style={{ fontWeight: '600', color: '#1e293b' }}>247</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Đang làm việc:</span>
                <span style={{ fontWeight: '600', color: '#10b981' }}>235</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Nghỉ phép:</span>
                <span style={{ fontWeight: '600', color: '#f59e0b' }}>12</span>
              </div>
            </div>
          </div>

          {/* Chức năng chính */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#1e293b', fontSize: '18px' }}>
              ⚡ Chức năng chính
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Quản lý nhân viên
              </button>
              <button style={{
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Chấm công
              </button>
              <button style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Báo cáo lương
              </button>
            </div>
          </div>
        </div>

        {/* Legacy Component */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <HrmInfo />
        </div>
      </main>
    </div>
  );
} 