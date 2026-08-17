import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';
import { getSiteConfig } from '@/lib/api/config';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'مثمر | Mothmer — اعلانك ديما مؤثر',
  description:
    'مثمر منصة إعلانية تربط العلامات التجارية بصناع المحتوى في السوق المصري والعربي، وتحوّل الإعلان من مجرد مشاهدة إلى تأثير حقيقي.',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'مثمر | Mothmer',
    description: 'Make your ad matter — منصة المؤثرين الرائدة في مصر',
    type: 'website',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const configRes = await getSiteConfig().catch(() => null);
  const config = configRes?.data ?? null;

  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={cairo.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LanguageProvider>
            <AuthProvider>
              <ToastProvider>
                <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
                  <Header config={config} />
                  <main className="flex-1">{children}</main>
                  <Footer config={config} />
                </div>
              </ToastProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
