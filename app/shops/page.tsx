import ShopSection from "@/components/ShopSection"
import { shops } from "@/data/shops"

const Shop = () => {
  return (
    <section className='pt-[11rem] flex flex-col items-center w-full'>
      <div className='w-full h-0 border-x-[20rem] border-b-[3rem] border-transparent border-b-blue-200 rotate-180 mb-0'></div>
      <h1 className="text-2xl font-bold relative bottom-10">
        Shops
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        {shops.map((shop) => (
          <ShopSection key={shop.location} shop={shop} />
        ))}
      </div>
    </section>
  )
}

export default Shop