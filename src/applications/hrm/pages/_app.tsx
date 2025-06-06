import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Nếu bạn có file global styles, thường là Tailwind imports

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp; 