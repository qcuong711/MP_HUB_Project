import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Frontend Gateway (Shell Application - Pages Router)</h1>
      <p>Đây là ứng dụng shell chính. Nó sẽ tải các micro-frontends.</p>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/demo-hrm" style={{ textDecoration: 'underline', color: 'blue' }}>
              Xem Demo HRM MFE
            </Link>
          </li>
          <li>
            <Link href="/demo-event" style={{ textDecoration: 'underline', color: 'blue' }}>
              Xem Demo Event MFE
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
} 