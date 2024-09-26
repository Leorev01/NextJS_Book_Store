import React from 'react'
import { Input } from './ui/input'

const LoginForm = () => {
  return (
      <section className='flex flex-col min-w-[50vw] max-w-[30rem]'>
        <label htmlFor='email'>Email</label>
        <Input name='email'/>
        <label htmlFor='passwiord'>Password</label>
        <Input name='password'/>
      </section>
  )
}

export default LoginForm