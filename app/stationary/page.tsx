import { Button } from "@/components/ui/button"
import { stationary } from "@/data/stationary"
import Image from "next/image"

const StationaryPage = () => {
  return (
    <section className='pt-[11rem] flex flex-col items-center w-full'>
        <div className='w-full h-0 border-x-[20rem] border-b-[3rem] border-transparent border-b-red-200 rotate-180 mb-0'></div>
        <h1 className="text-2xl font-bold relative bottom-10">
            Gifts
        </h1>
        <div className="grid grid-cols-5 grid-flow-dense justify-evenly w-screen gap-20 px-10">
            {stationary.map((stationary) => (
                <div key={stationary.name} className="flex flex-col items-center bg-red-200 p-2 min-w-[8rem] justify-between">
                    <Image src={stationary.image} alt={stationary.name} width={200} height={200} />
                    <h1 className="font-bold">{stationary.name}</h1>
                    <p>{stationary.price}</p>
                    <Button>Add</Button>
                </div>
            ))}
        </div>
        
    </section>
  )
}

export default StationaryPage