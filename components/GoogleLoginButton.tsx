import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import Image from 'next/image';
import googleLogo from '@/public/images/google.png';


const GoogleLoginButton = () => {
  return (
    <Button onClick={() => signIn('google')} className="w-[47%] text-black border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 flex items-center justify-center">
      <Image src={googleLogo} alt="Google logo" width={20} height={20} />
      <span className="ml-2">Google</span>
    </Button>
  );
};

export default GoogleLoginButton;