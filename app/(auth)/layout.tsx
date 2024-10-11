import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import SessionProviderComponent from './(components)/SessionProvider';
import Navbar from "./(components)/Navbar";
import SessionAuth from "./(components)/SessionAuth";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BookBuy",
  description: "The world's #1 book retailer",
  icons: {
    icon: '/images/bookbuy_icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderComponent>
          <SessionAuth>
            <Navbar />
            {children}
          </SessionAuth>
        </SessionProviderComponent>
      </body>
    </html>
  );
}
