'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SessionAuth({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null); // Use null for the initial state

  useEffect(() => {
    const getUser = async () => {
      if (!session?.user?.email) {
        // Early exit if there is no email
        console.warn('No user email available');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/get-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: session.user.email }), // Use session.user.email directly
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error fetching user:', response.status, errorText);
          return;
        }

        const result = await response.json();
        setUserRole(result.user?.role || null); // Safely access the role

      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    if (status === 'authenticated') {
      getUser(); // Call the function only when authenticated
    }

  }, [session, status]); // Adjusted dependencies

  useEffect(() => {
    if (userRole === 'admin') {
      return; // Do nothing if the user is an admin
    }

    if (status === 'unauthenticated') {
      router.push('/account'); // Redirect to login if unauthenticated
    } else if (userRole !== null) {
      router.push('/'); // Redirect if not an admin
    }

  }, [userRole, status, router]); // Add userRole to the dependencies

  if (status === 'loading') {
    return <p>Loading...</p>; // Show loading state while checking session
  }

  if (status === 'authenticated' && userRole === 'admin') {
    return <>{children}</>; // Render children if authenticated and admin
  }

  return null; // Return null if no conditions match (to avoid rendering issues)
}
