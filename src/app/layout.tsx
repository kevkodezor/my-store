import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/Header';
import { getCategories } from '@/actions/category';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { getExchange } from '@/actions/exchange';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Onway Shop',
  description: 'Tienda de Electónica y Accesorios',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const categories = await getCategories();
  const exchange = await getExchange();

  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-screen flex flex-col'>
        <Header categories={categories} />
        <main className='flex-1'>
          {children}
        </main>
        <CartDrawer exchange={exchange} />
        <Footer />
      </body>
    </html>
  );
}
