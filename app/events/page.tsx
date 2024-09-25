import EventsSection from '@/components/EventsSection';
import { events } from '@/data/events'; 

const page = () => {
  return (
    <section className='pt-[11rem] flex flex-col items-center w-full'>
      <div className='w-full h-0 border-x-[20rem] border-b-[3rem] border-transparent border-b-blue-300 rotate-180 mb-0'></div>
      <h1 className="text-2xl font-bold relative bottom-10">
        Events
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        {events.map((event) => (
                <EventsSection key={event.title} event={event} />
        ))}
      </div>
    </section>
  )
}

export default page