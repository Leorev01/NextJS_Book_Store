'use client';

import StationaryItem from "@/components/StationaryItem"
import { stationary } from "@/data/stationary"

const StationaryPage = () => {
  return (
    <section className='pt-[11rem] flex flex-col items-center w-full'>
        <div className='w-full h-0 border-x-[20rem] border-b-[3rem] border-transparent border-b-red-200 rotate-180 mb-0'></div>
        <h1 className="text-2xl font-bold relative bottom-10">
            Stationary
        </h1>
        <div className="grid grid-cols-5 grid-flow-dense justify-evenly w-screen gap-20 px-10">
            {stationary.map((item) => (
                <StationaryItem key={item.title} stationary={item} />
            ))}
        </div>
        
    </section>
  )
}

export default StationaryPage