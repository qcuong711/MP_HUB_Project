import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Đảm bảo bạn có file này

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp; 