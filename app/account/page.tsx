'use client';

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import AccountUserPage from "@/components/AccountUserPage";
import { useState, useEffect } from "react";
import { GoogleCredentialResponse } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { useSession, signOut } from "next-auth/react";

interface DecodedJWT {
  name: string;
  email: string;
}

const AccountPage = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<string | null>(null);
  const [register, setRegister] = useState(true);

  const handleGoogleSuccess = (response: GoogleCredentialResponse) => {
    // Decode the JWT and specify the structure of the decoded object
    const userObject = jwtDecode<DecodedJWT>(response.credential as string);
    
    console.log('Google User Info: ', userObject);
    
    // Store the user name in localStorage
    localStorage.setItem('user', userObject.name);
    
    // Update the user state to trigger a re-render
    setUser(userObject.name);
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  // Fetch user from localStorage after the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);
  }, []);
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    signOut(); // Sign out of next-auth
  };

  // Conditionally render the UI based on user session
  if (user || session) {
    return (
      <section className='pt-[11rem] flex flex-col items-center'>
        <AccountUserPage user={user || session?.user?.name as string} handleLogout={handleLogout} />
      </section>
    );
  }

  return (
    <section className='pt-[11rem] flex flex-col items-center'>
      <script src="https://accounts.google.com/gsi/client" async></script>
      {register ? (
        <RegisterForm 
          switchForm={() => setRegister(false)} 
          onRegisterSuccess={() => setUser(localStorage.getItem('user'))} 
          googleSuccess={handleGoogleSuccess} 
          googleError={handleGoogleError}
        />
      ) : (
        <LoginForm 
          switchForm={() => setRegister(true)} 
          onLoginSuccess={() => setUser(localStorage.getItem('user'))} 
          googleSuccess={handleGoogleSuccess} 
          googleError={handleGoogleError} 
        />
      )}
    </section>
  );
};

export default AccountPage;
