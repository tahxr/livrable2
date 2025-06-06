import styles from "@/app/layout.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Poppins, Lora } from 'next/font/google';
import InstallButton from "@/components/InstallButton";

import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-poppins'
});
const lora = Lora({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
  variable: '--font-lora'
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${lora.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={styles.body}>
        <Header />
        <InstallButton /> {/* Bouton d'installation */}
        <main className={styles.main}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}