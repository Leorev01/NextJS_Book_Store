import Image from 'next/image'
import AddButton from './AddButton'
import Link from 'next/link'

type stationaryType = {
  id: number;
  title: string;
  price: number;
  image: string;
}

const StationaryItem = ({ stationary }: { stationary: stationaryType}) => {
  return (
    <div className="flex flex-col items-center bg-red-200 p-2 min-w-[8rem] justify-between rounded-md">
        <Link href={`/stationary/${stationary.id}`}><Image src={stationary.image} alt={stationary.title} width={200} height={200} /></Link>
        <h1 className="font-bold">{stationary.title}</h1>
        <p>£{stationary.price}</p>
        <AddButton item={stationary} />
    </div>
  )
}

export default StationaryItem