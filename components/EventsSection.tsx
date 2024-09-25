import Image from 'next/image';
import { Button } from './ui/button';

type eventType = {
    title: string,
    description: string,
    date: string,
    location: string,
    image: string
}

const EventsSection = ({event}: {event:eventType}) => {
  return (
    <div key={event.title} className='w-full h-full bg-blue-200 my-2 flex flex-row p-10 rounded-md'>
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl font-bold mb-5'>{event.title}</h1>
          <p>{event.description}</p>
          <p className='underline mt-5'>Date: {event.date}</p>
          <p className='underline'>Location: {event.location}</p>
          <Button className='mt-5'>Book Now</Button>
        </div>
          <Image src={event.image} alt={event.title} width={300} height={300}/>
    </div>
  )
}

export default EventsSection