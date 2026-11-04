import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BURKA BAZAAR | The Everyday Elegance Burka',
  description: 'Modesty in every detail. A graceful modest look designed for your everyday moments. Order premium modest wear on WhatsApp with fast delivery across Bangladesh.',
  openGraph: {
    title: 'BURKA BAZAAR | The Everyday Elegance Burka',
    description: 'Modesty in every detail. Simple, graceful, and timeless burkas and abayas.',
    type: 'website',
    locale: 'bn_BD',
    images: [
      {
        url: '/assets/aistudio/burka_03b27e5d.png',
        width: 1024,
        height: 1536,
        alt: 'Burka Bazaar - The Everyday Elegance Burka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BURKA BAZAAR | The Everyday Elegance Burka',
    description: 'Modesty in every detail. Simple, graceful, and timeless burkas and abayas.',
    images: ['/assets/aistudio/burka_03b27e5d.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#1F1C18',
  width: 'device-width',
  initialScale: 1,
};

import { AppProvider } from '@/context/AppContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className="antialiased selection:bg-[#E2D5C3] selection:text-[#1F1C18]">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
