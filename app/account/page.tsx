'use client';

import RegisterForm from "@/components/RegisterForm";


const page = () => {

  const user = localStorage.getItem('user');

  if(user){
    return(
      <p>
        Account Page
      </p>
    )
  }
  return (
    <section className='pt-[11rem] flex flex-col items-center'>
        <RegisterForm/>
    </section>
  )
}

export default page