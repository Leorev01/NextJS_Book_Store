import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';

const AccountUserPage = ({ handleLogout }: { handleLogout: () => void }) => {
  const { data: session, status } = useSession(); // Use useSession to get session data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    // Set loading to false immediately after getting the session
    if (status !== 'loading') {
      setLoading(false);
    }
  }, [status]);

  // Show loading indicator while fetching user details
  if (loading) {
    return <div>Loading...</div>; // Customize this loading indicator as needed
  }

  // If session exists, extract user details
  const userDetails = session?.user;

  if (!userDetails) {
    return (
      <section>
        <h1>Welcome! Please log in to see your details.</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </section>
    );
  }

  return (
    <section>
      <h1>Welcome {userDetails.name}</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <div>
        <h1>Profile</h1>
        <p>Name: {userDetails.name}</p>
        <p>Email: {userDetails.email}</p>
      </div>
    </section>
  );
};

export default AccountUserPage;
