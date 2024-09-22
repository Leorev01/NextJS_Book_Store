import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <section className="pt-[11rem] flex flex-col items-center">
      <h1 className="text-xl font-bold">Home Page</h1>
      <div className='bg-[#000dff] min-w-[40rem] w-[70%] aspect-[40/14] rounded-lg my-6'>
        <p className="text-white relative top-1/4 left-[20%]
        text-lg md:text-xl lg:text-2xl">
          The exquisite collection<br/>by Gianni Versace
          </p>
        <Button className='relative top-[40%] left-1/4 bg-white text-black 
        hover:bg-gray-200 text-sm md:text-bae lg:text-lg'>
          Pre-order
        </Button>
      </div>
    </section>
  );
}
