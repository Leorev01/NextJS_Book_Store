// SessionProviderComponent.tsx
'use client';  // Only this file is marked as a client component

import { SessionProvider } from "next-auth/react";

export default function SessionProviderComponent({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
