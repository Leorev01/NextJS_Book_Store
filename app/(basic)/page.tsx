import { Button } from "@/components/ui/button";
import Image from "next/image";
import magicBook from "@/public/images/magic_book.gif";
import BookSection from "@/components/BookSection";
import EventsSection from "@/components/EventsSection";
import { events } from "@/data/events";


export default function Home() {
  return (
    <section className="pt-[11rem] flex flex-col items-center max-width-screen">
      <h1 className="text-xl font-bold">Home Page</h1>
      <div className='bg-[#000dff] w-[70%] aspect-[40/14] rounded-lg my-6 text-white'>
        <p className="relative top-1/4 left-[15%]
        text-lg md:text-xl lg:text-2xl">
          The exquisite collection
          <br/>
          by <strong className="font-serif text-yellow-400">Gianni Versace</strong>
        </p>
        <p className="relative top-[30%] left-[17%]
        text-lg md:text-xl lg:text-2xl font-serif">
          Exclusive Edition
        </p>
        <Button className='relative top-[40%] left-[20%] bg-white text-black 
        hover:bg-gray-200 text-sm md:text-bae lg:text-lg'>
          Pre-order
        </Button>
        <Image src={magicBook} alt='magic book' className="relative sm:w-[14rem] md:w-[18rem] lg:w-[22rem] left-[50%] bottom-[10%]"/>
      </div>
      <div className="flex flex-col">
        <BookSection title='Bestsellers'/>
        <BookSection title='New'/>
        <h1 className='text-3xl font-bold ml-10 my-5'>Events</h1>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mx-5">
          <EventsSection event={events[0]}/>
          <EventsSection event={events[1]}/>
        </div>
        <BookSection title='Fiction'/>
        <BookSection title='Non-fiction'/>
        <BookSection title='Dystopian'/>
        <BookSection title='Fantasy'/>
      </div>
    </section>
  );
}
