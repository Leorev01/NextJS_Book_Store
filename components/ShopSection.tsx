import Image from "next/image";

type shopProps ={
    location:string,
    image:string,
    description:string,
}

const ShopSection = ({shop} : {shop: shopProps}) => {
  return (
    <div className='w-full h-full bg-blue-200 my-2 flex flex-row p-10 rounded-md'>
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl font-bold mb-5'>{shop.location}</h1>
          <p>{shop.description}</p>
        </div>
          <Image src={shop.image} alt='shop image w-[10rem]' width={300} height={300}/>
    </div>
  )
}

export default ShopSection