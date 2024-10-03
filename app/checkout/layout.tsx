'use client';

import { SessionProvider } from "next-auth/react";


export default function CheckoutLayout({children,}: Readonly<{children: React.ReactNode}>) {

  return (
        <SessionProvider>
        {children}
        </SessionProvider>
  );
}
