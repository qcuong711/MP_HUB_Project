import React, { useState, useRef, useEffect } from 'react';

interface MicrofrontendIframeProps {
  src: string;
  title: string;
  height?: string;
  onLoad?: () => void;
  onError?: () => void;
  useSubdomain?: boolean;
  subdomainUrl?: string;
}

export default function MicrofrontendIframe({ 
  src, 
  title, 
  height = '600px',
  onLoad,
  onError,
  useSubdomain = false,
  subdomainUrl
}: MicrofrontendIframeProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const iframeUrl = useSubdomain && subdomainUrl ? subdomainUrl : src;

  const handleLoad = () => {
    setLoading(false);
    setError(false);
    onLoad?.();
    
    console.log(`✅ ${title} loaded successfully from: ${iframeUrl}`);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    onError?.();
    
    console.error(`❌ Failed to load ${title} from: ${iframeUrl}`);
  };

  // Auto-resize iframe dựa trên nội dung
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const resizeIframe = () => {
      try {
        // Chỉ resize nếu iframe cùng origin (localhost hoặc same subdomain)
        if (iframe.contentWindow) {
          const contentHeight = iframe.contentWindow.document.body.scrollHeight;
          iframe.style.height = `${Math.max(contentHeight, 400)}px`;
        }
      } catch (e) {
        // Cross-origin, không thể resize - giữ nguyên height mặc định
        console.log('Cross-origin iframe, sử dụng height mặc định');
      }
    };

    iframe.addEventListener('load', resizeIframe);
    return () => iframe.removeEventListener('load', resizeIframe);
  }, [iframeUrl]);

  return (
    <div className="microfrontend-container">
      {/* URL Info */}
      <div style={{
        fontSize: '12px',
        color: '#64748b',
        marginBottom: '8px',
        padding: '4px 8px',
        backgroundColor: '#f1f5f9',
        borderRadius: '4px',
        fontFamily: 'monospace'
      }}>
        📡 Loading from: {iframeUrl}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="loading-overlay" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: height,
          backgroundColor: '#f3f4f6',
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div className="spinner" style={{
              width: '40px',
              height: '40px',
              border: '4px solid #e5e7eb',
              borderTop: '4px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 10px'
            }}></div>
            <p style={{ color: '#6b7280' }}>Đang tải {title}...</p>
            <p style={{ color: '#9ca3af', fontSize: '12px' }}>
              {useSubdomain ? '🌐 Subdomain mode' : '📍 Localhost mode'}
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="error-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: height,
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h3>❌ Lỗi tải {title}</h3>
            <p>Không thể kết nối tới microfrontend</p>
            <p style={{ fontSize: '12px', fontFamily: 'monospace', color: '#ef4444' }}>
              URL: {iframeUrl}
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
              <button 
                onClick={() => {
                  setError(false);
                  setLoading(true);
                  if (iframeRef.current) {
                    iframeRef.current.src = iframeUrl;
                  }
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                🔄 Thử lại
              </button>
              {useSubdomain && (
                <button
                  onClick={() => {
                    setError(false);
                    setLoading(true);
                    if (iframeRef.current) {
                      // Fallback to localhost
                      iframeRef.current.src = src;
                    }
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  📍 Fallback localhost
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Iframe */}
      <iframe
        ref={iframeRef}
        src={iframeUrl}
        title={title}
        width="100%"
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          display: loading || error ? 'none' : 'block'
        }}
        // Security attributes
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
        loading="lazy"
        // Allow cross-domain
        allow="cross-origin-isolated"
      />

      {/* CSS cho spinning animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 