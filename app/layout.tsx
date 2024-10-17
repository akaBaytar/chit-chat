import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Chat App',
  keywords: 'real-time chat, group messaging, photo sharing, instant messaging',
  description:
    'Connect with friends and communities in real-time with Chat App. Share messages, photos and create groups for communication. Experience secure and interactive conversations anytime, anywhere.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
