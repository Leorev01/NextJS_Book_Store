import { Button } from './ui/button';
import { Input } from './ui/input'
import { Label } from './ui/label'
import { FormEvent, useRef } from 'react';
import { GoogleCredentialResponse, GoogleLogin } from '@react-oauth/google';
import GithubLoginButton from './GithubLoginButton';
import GoogleLoginButton from './GoogleLoginButton';

type Props = {
  switchForm: () => void;
  onRegisterSuccess: () => void;
  googleSuccess: (response: GoogleCredentialResponse) => void;
  googleError: () => void;
};


const RegisterForm = ({switchForm, onRegisterSuccess, googleSuccess, googleError}: Props) => {


  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const password2 = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
  
    if (password.current?.value !== password2.current?.value) {
      console.log('Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/add-user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Ensure this header is set
        },
        body: JSON.stringify({
          username: username.current?.value.trim(),
          email: email.current?.value.trim(),
          password: password.current?.value,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      } else {
        console.log('User registered successfully');
        localStorage.setItem('user', (username.current?.value as string));
        
        onRegisterSuccess();
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  


  return (
      <div className='flex flex-col w-[30rem] border border-black rounded-3xl mt-5 p-10 gap-3'>
        <h1 className='text-2xl font-bold text-center'>Create an account</h1>
        <div className='flex flex-row justify-between'>
           <GithubLoginButton />
           <GoogleLoginButton />
        </div>

        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                </span>
            </div>
        </div>
        <form className='flex flex-col gap-2' onSubmit={(e)=>submitHandler(e)}>
            <Label htmlFor="username">Username</Label>
            <Input type="username" id="username" placeholder="Username" ref={username} required minLength={1}/>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" ref={email} required />
            <Label htmlFor="password">Password</Label>
            <Input type='password' id='password' placeholder='Password' ref={password} required minLength={6}/> 
            <Label htmlFor="password2">Password</Label>
            <Input type='password' id='password2' placeholder='Re-enter Password' ref={password2} required minLength={6}/> 

            <Button className='mt-2'>Register</Button>
        </form>
        <p onClick={switchForm} className='cursor-pointer hover:scale-110 duration-300 text-center'>Sign-in</p>
        <div>

        </div>
      </div>
  )
}

export default RegisterForm;
