// frontend-gateway/pages/demo-event.tsx
// 'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MicrofrontendIframe from '../components/MicrofrontendIframe';

export default function DemoEventPage() {
  const [useSubdomain, setUseSubdomain] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ 
          textDecoration: 'underline', 
          color: 'blue',
          marginBottom: '10px',
          display: 'inline-block'
        }}>
          ← Quay về trang chủ
        </Link>
        <h1>🎉 Hệ thống Sự kiện</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Microfrontend quản lý sự kiện được tải qua iframe
        </p>

        {/* Domain Switcher */}
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          marginBottom: '20px',
          padding: '12px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <span style={{ fontWeight: '600', color: '#374151' }}>🌐 Chế độ:</span>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="domain-mode"
              checked={!useSubdomain}
              onChange={() => setUseSubdomain(false)}
            />
            <span>📍 Localhost (localhost:3002)</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="domain-mode"
              checked={useSubdomain}
              onChange={() => setUseSubdomain(true)}
            />
            <span>🌐 Subdomain (event.edu.vn:3002)</span>
          </label>
        </div>
      </div>

      {/* Iframe Container */}
      <div style={{ 
        border: '2px solid #e5e7eb',
        borderRadius: '10px',
        padding: '10px',
        backgroundColor: '#fafafa'
      }}>
        <MicrofrontendIframe
          src="http://localhost:3002"
          subdomainUrl="http://event.edu.vn:3002"
          useSubdomain={useSubdomain}
          title="Event Microfrontend"
          height="700px"
          onLoad={() => console.log('Event microfrontend đã tải thành công')}
          onError={() => console.error('Lỗi tải Event microfrontend')}
        />
      </div>

      {/* Information */}
      <div style={{ 
        marginTop: '20px', 
        padding: '15px',
        backgroundColor: '#f0fff4',
        border: '1px solid #10b981',
        borderRadius: '8px'
      }}>
        <h3>ℹ️ Thông tin kỹ thuật</h3>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Event App: <strong>{useSubdomain ? 'event.edu.vn:3002' : 'localhost:3002'}</strong></li>
          <li>Phương thức tích hợp: <strong>Iframe</strong></li>
          <li>Bảo mật: Sandbox với script và same-origin</li>
          <li>CORS: Configured for subdomain access</li>
          <li>Hiệu năng: Lazy loading</li>
        </ul>
      </div>

      {/* Domain Setup Instructions */}
      {useSubdomain && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '8px'
        }}>
          <h3>⚙️ Cấu hình Subdomain</h3>
          <p style={{ marginBottom: '10px' }}>
            Để sử dụng subdomain, bạn cần cấu hình file hosts:
          </p>
          <ol style={{ paddingLeft: '20px' }}>
            <li>Chạy <code>setup-domains.bat</code> với quyền Administrator</li>
            <li>Khởi động lại các ứng dụng</li>
            <li>Truy cập qua domain mới</li>
          </ol>
        </div>
      )}
    </div>
  );
} 