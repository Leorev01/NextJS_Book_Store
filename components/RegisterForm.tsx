import { signIn } from 'next-auth/react'; // Import the signIn function
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dispatch, FormEvent, SetStateAction, useRef } from 'react';
import GithubLoginButton from './GithubLoginButton';
import GoogleLoginButton from './GoogleLoginButton';
import { message } from 'antd';

type Props = {
  switchForm: () => void;
  setUser: Dispatch<SetStateAction<string | null>>;
};

const RegisterForm = ({ switchForm, setUser }: Props) => {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const password2 = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // Check for password mismatch
    if (password.current?.value !== password2.current?.value) {
      message.error('Passwords do not match');
      return;
    }

    // Basic validation before making the request
    const usernameValue = username.current?.value.trim();
    const emailValue = email.current?.value.trim();
    const passwordValue = password.current?.value;

    if (!usernameValue || !emailValue || !passwordValue) {
      message.error("Please fill in all fields");
      return;
    }

    try {
      // Send registration request
      const response = await fetch("http://localhost:3000/api/add-user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
        }),
      });

      // Check response status
      if (!response.ok) {
        const errorData = await response.json();
        message.error(errorData.error || 'Registration failed');
        return;
      }

      // Automatically sign the user in after registration
      const result = await signIn('credentials', {
        redirect: false,
        email: emailValue,
        password: passwordValue,
      });

      if (result?.error) {
        message.error(result.error);
        return;
      }

      // Success message
      message.success("Registration and sign-in successful");
      
      // Update the user in the state (if needed)
      setUser(usernameValue);

    } catch (error) {
      console.error("Error during registration", error);
      message.error("Registration failed. Please try again.");
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

      <form className='flex flex-col gap-2' onSubmit={submitHandler}>
        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" placeholder="Username" ref={username} required minLength={1} />
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" ref={email} required />
        <Label htmlFor="password">Password</Label>
        <Input type='password' id='password' placeholder='Password' ref={password} required minLength={6} />
        <Label htmlFor="password2">Re-enter Password</Label>
        <Input type='password' id='password2' placeholder='Re-enter Password' ref={password2} required minLength={6} />

        <Button className='mt-2'>Register</Button>
      </form>

      <p onClick={switchForm} className='cursor-pointer hover:scale-110 duration-300 text-center'>Sign-in</p>
    </div>
  );
}

export default RegisterForm;
