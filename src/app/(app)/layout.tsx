import '../../index.css';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import { ThemeProvider } from '../../components/ThemeProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from '@/components/navbar/Navbar';
 
export const metadata: Metadata = {
  title: 'SunnahReads',
  description: 'Placeholder for SunnahReads',
};

const rubik = Rubik({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={rubik.className} suppressHydrationWarning={true}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='h-screen overflow-y-auto scrollbar scrollbar-thumb-amber-100 dark:scrollbar-thumb-amber-900 scrollbar-track-zinc-50 dark:scrollbar-track-zinc-950'>
            <Navbar />
            {children}
            <SpeedInsights />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}