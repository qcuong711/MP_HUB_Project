import React from 'react';
import EventInfo from '../components/EventInfo';

export default function EventHomePage() {
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
          gap: '16px',
          marginBottom: '8px'
        }}>
          <div style={{
            backgroundColor: '#8b5cf6',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '24px'
          }}>
            🎉
          </div>
          <div>
            <h1 style={{
              margin: 0,
              color: '#1e293b',
              fontSize: '28px',
              fontWeight: '700'
            }}>
              Hệ thống Sự kiện
            </h1>
            <p style={{
              margin: '4px 0 0 0',
              color: '#64748b',
              fontSize: '16px'
            }}>
              Quản lý và tổ chức các sự kiện công ty
            </p>
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
            backgroundColor: '#ddd6fe',
            color: '#5b21b6',
            padding: '4px 8px',
            borderRadius: '4px',
            fontWeight: '500'
          }}>
            ✅ Hoạt động
          </span>
          <span>Port: 3002</span>
          <span>•</span>
          <span>Microfrontend Architecture</span>
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
          {/* Sự kiện sắp tới */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#1e293b', fontSize: '18px' }}>
              📅 Sự kiện sắp tới
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                padding: '12px',
                backgroundColor: '#fef3c7',
                borderRadius: '8px',
                border: '1px solid #f59e0b'
              }}>
                <div style={{ fontWeight: '600', color: '#92400e' }}>Họp tổng kết Q4</div>
                <div style={{ fontSize: '14px', color: '#78350f' }}>28/12/2024 - 14:00</div>
              </div>
              <div style={{
                padding: '12px',
                backgroundColor: '#dbeafe',
                borderRadius: '8px',
                border: '1px solid #3b82f6'  
              }}>
                <div style={{ fontWeight: '600', color: '#1d4ed8' }}>Team Building</div>
                <div style={{ fontSize: '14px', color: '#1e40af' }}>05/01/2025 - 09:00</div>
              </div>
              <div style={{
                padding: '12px',
                backgroundColor: '#dcfce7',
                borderRadius: '8px',
                border: '1px solid #10b981'
              }}>
                <div style={{ fontWeight: '600', color: '#065f46' }}>Training mới</div>
                <div style={{ fontSize: '14px', color: '#047857' }}>10/01/2025 - 15:30</div>
              </div>
            </div>
          </div>

          {/* Thống kê */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#1e293b', fontSize: '18px' }}>
              📊 Thống kê sự kiện
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Tổng sự kiện:</span>
                <span style={{ fontWeight: '600', color: '#1e293b' }}>125</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Đã hoàn thành:</span>
                <span style={{ fontWeight: '600', color: '#10b981' }}>98</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Đang diễn ra:</span>
                <span style={{ fontWeight: '600', color: '#f59e0b' }}>15</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Sắp tới:</span>
                <span style={{ fontWeight: '600', color: '#8b5cf6' }}>12</span>
              </div>
            </div>
          </div>

          {/* Chức năng chính */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0',
            gridColumn: 'span 2'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#1e293b', fontSize: '18px' }}>
              ⚡ Chức năng chính
            </h3>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px'
            }}>
              <button style={{
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>📝</span> Tạo sự kiện mới
              </button>
              <button style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>📋</span> Quản lý sự kiện
              </button>
              <button style={{
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>👥</span> Danh sách tham gia
              </button>
              <button style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>📊</span> Báo cáo
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
          <EventInfo />
        </div>
      </main>
    </div>
  );
} 