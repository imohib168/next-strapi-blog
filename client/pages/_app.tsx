import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UIFooter, UINavbar } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className='container mx-auto font-sans'>
      <UINavbar />

      <section className='pb-2'>
        <Component {...pageProps} />
      </section>

      <UIFooter />
    </main>
  );
}

export default MyApp;
