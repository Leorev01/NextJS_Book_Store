import { FormEvent, useRef } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import Image from 'next/image';
import githubLogo from '@/public/images/github.svg';
import { GoogleCredentialResponse, GoogleLogin } from '@react-oauth/google';


type Props = {
  switchForm: () => void;
  onLoginSuccess: () => void;
  googleSuccess: (response: GoogleCredentialResponse) => void;
  googleError: () => void;
};

const LoginForm = ({ switchForm, onLoginSuccess, googleSuccess, googleError }: Props) => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.current?.value.trim(),
          password: password.current?.value,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      } else {
        console.log('User logged in successfully');
        const responseData = await response.json();
        const user = responseData.user.username;
        localStorage.setItem('user', user);
        onLoginSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='flex flex-col w-[30rem] border border-black rounded-3xl mt-5 p-10 gap-3'>
      <h1 className='text-2xl font-bold text-center'>Log in</h1>
      <div className='flex flex-row justify-between'>
        <Button className='w-[47%] text-blackborder gap-1 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2'>
          <Image src={githubLogo} alt='github logo' width={20} height={20} />
          Github
        </Button>
        <div className='w-[47%]'>
          <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
        </div>
      </div>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t'></span>
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
        </div>
      </div>
      <form onSubmit={submitHandler} className='flex flex-col gap-2'>
        <Label htmlFor='email'>Email</Label>
        <Input type='email' id='email' placeholder='Email' ref={email} required />
        <Label htmlFor='password'>Password</Label>
        <Input type='password' id='password' placeholder='Password' ref={password} required />

        <Button className='mt-2'>Sign-in</Button>
      </form>
      <p onClick={switchForm} className='cursor-pointer hover:scale-110 duration-300 text-center'>
        Register
      </p>
    </div>
  );
};

export default LoginForm;
