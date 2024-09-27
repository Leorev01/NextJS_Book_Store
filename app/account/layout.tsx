'use client';

import { SessionProvider } from "next-auth/react";


export default function AccountLayout({children,}: Readonly<{children: React.ReactNode}>) {

  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  return (
        <SessionProvider>
        {children}
        </SessionProvider>
  );
}
