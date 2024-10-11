'use client';

import StationaryItem from "@/components/StationaryItem"
import { stationary } from "@/data/stationary"

const StationaryPage = () => {
  return (
    <section className='pt-[11rem] flex flex-col items-center w-full mx-0 px-0 w-screen'>
        <div className='w-screen h-0 border-x-[20rem] border-b-[3rem] border-transparent border-b-red-200 rotate-180 m-0'></div>
        <h1 className="text-2xl font-bold relative bottom-10">
            Stationary
        </h1>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-flow-dense justify-evenly gap-20 px-10">
            {stationary.map((item) => (
                <StationaryItem key={item.title} stationary={item} />
            ))}
        </div>
        
    </section>
  )
}

export default StationaryPage