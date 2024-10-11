// components/LoginWithGithub.tsx
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import Image from 'next/image';
import githubLogo from '@/public/images/github.svg';
import { message } from 'antd';

const GithubLoginButton = () => {
  return (
    <Button onClick={() => {signIn('github'); message.success('Logged in successfully')}} className="w-[47%] text-blackborder gap-1 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
        <Image src={githubLogo} alt='github logo' width={20} height={20}/>
        Github
    </Button>
  );
};

export default GithubLoginButton;
