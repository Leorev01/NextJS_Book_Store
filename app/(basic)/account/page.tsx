'use client';

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import AccountUserPage from "@/components/AccountUserPage";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { PacmanLoader } from "react-spinners";

const AccountPage = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<string | null>(null);
  const [register, setRegister] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user from localStorage after the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser); // Set user directly from localStorage
    setIsLoading(false); // Set loading to false after fetching the user
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    if(session){
      signOut(); // Sign out of next-auth
    }
  };

  // Show loading spinner while waiting for session status
  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader color="#36d7b7" />
      </div>
    );
  }

  // Check if the user is authenticated
  const isAuthenticated = user || (session && session.user);

  return (
    <section className='pt-[11rem] flex flex-col items-center'>
      {isAuthenticated ? (
        <AccountUserPage handleLogout={handleLogout} />
      ) : (
        <>
          {register ? (
            <RegisterForm 
              switchForm={() => setRegister(false)} 
              setUser={setUser} 
            />
          ) : (
            <LoginForm 
              switchForm={() => setRegister(true)} 
              setUser={setUser} 
            />
          )}
        </>
      )}
    </section>
  );
};

export default AccountPage;
