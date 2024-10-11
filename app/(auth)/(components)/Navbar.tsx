import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-slate-100 h-[5rem]'>
        <ul className='flex flex-row gap-5 self-center'>
            <Link href='/dashboard'>
                <li className='hover:cursor-pointer hover:bg-slate-200 p-4 rounded-md'>Home</li>
            </Link>
            <Link href='/dashboard/users'>
                <li className='hover:cursor-pointer hover:bg-slate-200 p-4 rounded-md'>Users</li>
            </Link>
            <Link href='/dashboard/orders'>
                <li className='hover:cursor-pointer hover:bg-slate-200 p-4 rounded-md'>Orders</li>
            </Link>
            <Link href='/dashboard/categories'>
                <li className='hover:cursor-pointer hover:bg-slate-200 p-4 rounded-md'>Categories</li>
            </Link>
            
        </ul>
    </nav>
  )
}

export default Navbar