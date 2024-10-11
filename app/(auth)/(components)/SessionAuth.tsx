'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SessionAuth({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/account');
    }
  }, [status, router]);

  if (status === 'loading') {
    // Return a loading state while session is being checked
    return <p>Loading...</p>;
  }

  if(status === 'authenticated') {
    return <>{children}</>;
  }
}
