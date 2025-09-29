// File: src/pages/_app.js

import '@/styles/globals.css';
import { Orbitron, Cinzel, Rajdhani } from 'next/font/google'; // 1. Import Rajdhani

// Configure the fonts
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-orbitron',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel',
});

// 2. Configure Rajdhani
const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-rajdhani',
});

export default function App({ Component, pageProps }) {
  return (
    // 3. Add the new font variable
    <main className={`${orbitron.variable} ${cinzel.variable} ${rajdhani.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}