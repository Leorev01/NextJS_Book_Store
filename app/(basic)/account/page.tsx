'use client';

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import AccountUserPage from "@/components/AccountUserPage";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { PacmanLoader } from "react-spinners";
import { message } from "antd";

const AccountPage = () => {
  const { data: session, status } = useSession();
  const [register, setRegister] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user from localStorage after the component mounts
  useEffect(() =>{
    setIsLoading(false); // Set loading to false after fetching the user
  }, []);

  const handleLogout = () => {
    if(session){
      signOut(); // Sign out of next-auth
    }
    message.success('Logged out successfully!');
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
  const isAuthenticated = session && session.user;

  return (
    <section className='pt-[11rem] flex flex-col items-center'>
      {isAuthenticated ? (
        <AccountUserPage handleLogout={handleLogout} />
      ) : (
        <>
          {register ? (
            <RegisterForm 
              switchForm={() => setRegister(false)} 
            />
          ) : (
            <LoginForm 
              switchForm={() => setRegister(true)} 
            />
          )}
        </>
      )}
    </section>
  );
};

export default AccountPage;
