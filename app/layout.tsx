import localFont from 'next/font/local';
import type { Metadata } from 'next';

import ToasterContext from '@/context/Toaster';

import '../style/globals.css';

const geistSans = localFont({
  src: '../font/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Chit Chat',
  keywords: 'real-time chat, group messaging, photo sharing, instant messaging',
  description:
    'Connect with friends and communities in real-time with Chit Chat. Share messages, photos and create groups for communication. Experience secure and interactive conversations anytime, anywhere.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} antialiased`}>
        <ToasterContext />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
