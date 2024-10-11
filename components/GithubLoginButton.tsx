// components/LoginWithGithub.tsx
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import Image from 'next/image';
import githubLogo from '@/public/images/github.svg';
import { message } from 'antd';

const GithubLoginButton = () => {
  const handleLogin = async () => {
    const result = await signIn('github', { redirect: false }); // Use redirect: false to prevent automatic navigation

    if (result?.error) {
      // Handle login error
      message.error('Login failed. Please try again.');
    } else {
      // Successful login
      message.success('Logged in successfully');
    }
  };

  return (
    <Button 
      onClick={handleLogin} 
      className="w-[47%] text-black border gap-1 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
    >
      <Image src={githubLogo} alt='github logo' width={20} height={20} />
      Github
    </Button>
  );
};

export default GithubLoginButton;
