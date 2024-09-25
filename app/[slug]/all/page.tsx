'use client';

import { usePathname } from 'next/navigation';
import PageSection from '@/components/BookSection';

const page = () => {

  const path = usePathname();
  const genre = path?.split('/')[1];

  return (
    <section className='pt-[11rem] flex flex-col items-center w-full'>
        <div className='w-full h-0 border-x-[20rem] border-b-[3rem] border-transparent border-b-gray-300 rotate-180 mb-0'></div>
        <h1 className="text-2xl font-bold relative bottom-10">
            All {genre} books
        </h1>
        <PageSection title='all' genre={genre}/>
    </section>
  )
}

export default page