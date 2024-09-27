'use client';

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import AccountUserPage from "@/components/AccountUserPage";
import { useState, useEffect } from "react";

const AccountPage = () => {
  const [user, setUser] = useState<string | null>(null);
  const [register, setRegister] = useState(true);

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
      {register && <RegisterForm switchForm={() => setRegister(false)} onRegisterSuccess={handleLoginSuccess}/>}
      {!register && <LoginForm switchForm={() => setRegister(true)} onLoginSuccess={handleLoginSuccess} />}
    </section>
  );
};

export default AccountPage;
