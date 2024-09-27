'use client';

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import AccountUserPage from "@/components/AccountUserPage";
import { useState, useEffect } from "react";
import { GoogleCredentialResponse } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

interface DecodedJWT {
  name: string;
  email: string;
}
const AccountPage = () => {
  const [user, setUser] = useState<string | null>(null);
  const [register, setRegister] = useState(true);

  const handleGoogleSuccess = (response: GoogleCredentialResponse) => {
    // Decode the JWT and specify the structure of the decoded object
    const userObject = jwtDecode<DecodedJWT>(response.credential as string);
  
    console.log('Google User Info: ', userObject);
  
    // Store the user name in localStorage
    localStorage.setItem('user', userObject.name);
  
    // Call the onLoginSuccess callback
    handleLoginSuccess();
  };
  
  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  // Fetch user from localStorage after the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);
  }, []);
  

  // Function to update the user after successful login
  const handleLoginSuccess = () => {
    const loggedInUser = localStorage.getItem('user');
    setUser(loggedInUser); // Update user after login
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  }

  if (user) {
    return (
      <section className='pt-[11rem] flex flex-col items-center'>
        <AccountUserPage user={user} handleLogout={handleLogout} />
      </section>
    );
  }

  return (
    <section className='pt-[11rem] flex flex-col items-center'>
      <script src="https://accounts.google.com/gsi/client" async></script>
      {register && <RegisterForm switchForm={() => setRegister(false)} onRegisterSuccess={handleLoginSuccess} googleSuccess={handleGoogleSuccess} googleError={handleGoogleError}/>}
      {!register && <LoginForm switchForm={() => setRegister(true)} onLoginSuccess={handleLoginSuccess} googleSuccess={handleGoogleSuccess} googleError={handleGoogleError} />}
    </section>
  );
};

export default AccountPage;
