import { Button } from './ui/button';
import { Input } from './ui/input'
import { Label } from './ui/label'
import Image from 'next/image';
import githubLogo from '@/public/images/github.svg';
import googleLogo from '@/public/images/google.png';

const RegisterForm = () => {
  return (
      <div className='flex flex-col w-[25rem] border border-black rounded-3xl mt-5 p-10 gap-3'>
        <h1 className='text-2xl font-bold'>Create an account</h1>
        <div className='flex flex-row justify-between'>
           <Button className="w-[47%] text-blackborder gap-1 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                <Image src={githubLogo} alt='github logo' width={20} height={20}/>
                Github
            </Button>
            <Button className="w-[47%] text-blackborder gap-1 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                <Image src={googleLogo} alt='github logo' width={20} height={20}/>
                Google
            </Button> 
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
        
        <div>
            <Label htmlFor="username">Username</Label>
            <Input type="username" id="username" placeholder="Username" />
        </div>
        <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
        </div>        
        <div>
           <Label htmlFor="password">Password</Label>
            <Input type='password' id='password' placeholder='Password' /> 
        </div>
        <div>
           <Label htmlFor="password2">Password</Label>
            <Input type='password' id='password2' placeholder='Re-enter Password' /> 
        </div>

        <Button>Register</Button>
        <p>Sign-in</p>
        <div>

        </div>
      </div>
  )
}

export default RegisterForm;