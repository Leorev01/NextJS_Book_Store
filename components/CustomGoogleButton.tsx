// CustomGoogleButton.tsx

import { Button } from './ui/button';
import Image from 'next/image';
import googleLogo from '@/public/images/google.png';

interface CustomGoogleButtonProps {
  onClick: () => void;
}

const CustomGoogleButton: React.FC<CustomGoogleButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} className="w-full text-black border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 flex items-center justify-center">
      <Image src={googleLogo} alt="Google logo" width={20} height={20} />
      <span className="ml-2">Sign in with Google</span>
    </Button>
  );
};

export default CustomGoogleButton;