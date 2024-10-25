import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import OgImage from '../public/banner.png';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe Game | Fun, Minimalist, and Addictive Classic Grid Game',
  description:
    'Play the ultimate Tic-Tac-Toe game with a fun and engaging design! Challenge yourself or a friend on a minimalist 3x3 grid, featuring intuitive gameplay, bold X and O markers, and dynamic winning lines. Perfect for casual gaming anytime, anywhere.',
  metadataBase: new URL('https://tictactoe.pragusga.com'),
  authors: [
    {
      name: 'Taufik Pragusga',
      url: 'https://pragusga.com',
    },
  ],
  abstract:
    'Play the ultimate Tic-Tac-Toe game with a fun and engaging design! Challenge yourself or a friend on a minimalist 3x3 grid, featuring intuitive gameplay, bold X and O markers, and dynamic winning lines. Perfect for casual gaming anytime, anywhere.',
  applicationName: 'Tic-Tac-Toe Game',
  alternates: {
    canonical: 'https://tictactoe.pragusga.com',
  },
  category: 'Games',
  openGraph: {
    type: 'website',
    emails: ['taufik@pragusga.com'],
    title:
      'Tic-Tac-Toe Game | Fun, Minimalist, and Addictive Classic Grid Game',
    description:
      'Play the ultimate Tic-Tac-Toe game with a fun and engaging design! Challenge yourself or a friend on a minimalist 3x3 grid, featuring intuitive gameplay, bold X and O markers, and dynamic winning lines. Perfect for casual gaming anytime, anywhere.',
    siteName: 'Tic-Tac-Toe Game',
    countryName: 'Indonesia',
    url: 'https://tictactoe.pragusga.com',
    alternateLocale: 'id_ID',
    images: [
      {
        url: `${OgImage.src}`,
        width: 1200,
        height: 630,
        alt: 'Tic-Tac-Toe Game | Fun, Minimalist, and Addictive Classic Grid Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pragusga',
    title:
      'Tic-Tac-Toe Game | Fun, Minimalist, and Addictive Classic Grid Game',
    creator: '@pragusga',
    description:
      'Play the ultimate Tic-Tac-Toe game with a fun and engaging design! Challenge yourself or a friend on a minimalist 3x3 grid, featuring intuitive gameplay, bold X and O markers, and dynamic winning lines. Perfect for casual gaming anytime, anywhere.',
    images: [
      {
        url: `${OgImage.src}`,
        width: 1200,
        height: 630,
        alt: 'Tic-Tac-Toe Game | Fun, Minimalist, and Addictive Classic Grid Game',
      },
    ],
  },
  keywords: [
    'tic-tac-toe',
    'game',
    'grid',
    'classic',
    'fun',
    'minimalist',
    'addictive',
  ],
  appLinks: {
    web: {
      url: 'https://tictactoe.pragusga.com',
      should_fallback: false,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
