import '../styles/globals.css';
import { ThemeProvider } from 'next-themes'
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
  fallback: ['arial']
});

export default function App({ Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <>
      <style jsx global>
        {`
        :root {
          --inter-font: ${inter.style.fontFamily};
        }
      `}
      </style>
        <ThemeProvider attribute='class'>
          <main className={`${inter.className}`}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
    </>
  )
}