import Image from 'next/image'
import AddButton from './AddButton'

type stationaryType = {
  id: number;
  name: string;
  price: number;
  image: string;
}

const StationaryItem = ({ stationary }: { stationary: stationaryType}) => {
  return (
    <div key={stationary.name} className="flex flex-col items-center bg-red-200 p-2 min-w-[8rem] justify-between rounded-md">
        <Image src={stationary.image} alt={stationary.name} width={200} height={200} />
        <h1 className="font-bold">{stationary.name}</h1>
        <p>{stationary.price}</p>
        <AddButton item={stationary} />
    </div>
  )
}

export default StationaryItem