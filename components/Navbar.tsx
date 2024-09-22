import Image from "next/image";
import accountIcon from '@/public/images/account_icon.jpg';
import basketIcon from '@/public/images/basket_icon.png';
import searchIcon from '@/public/images/search_icon.png';


const Navbar = () => {
  return (
    <nav className="w-full border-b-2 fixed flex flex-col pb-5">
      <div className='flex justify-between items-center'>
        <div className="flex flex-row items-center ml-2">
            <p className="hover:cursor-pointer hover:scale-110">ACCOUNT</p>
            <Image src={accountIcon} alt="account icon" width={50} height={50}/>
        </div>
        <h1 className="text-4xl snap-center font-italiana shadow-lg shadow-red mr-4">
          BOOKBUY
        </h1>
        <Image className='mr-3' src={basketIcon} alt="basket icon" width={30} height={30}/>
      </div>
      <div className="flex flex-row-reverse items-center mr-3 mt-4">
        <Image src={searchIcon} alt="search icon" width={20} height={20} className="absolute mr-2 hover:cursor-pointer"/>
        <input placeholder=" Search" maxLength={40} className="border-2 border-black rounded-3xl w-[23rem] shadow-lg shadow-gray-500"/>
      </div>
      <div className="flex flex-row w-screen justify-around mt-5 self-center ">
        <p>Fiction</p>
        <p>Non-Fiction</p>
        <p>Events</p>
        <p>Shops</p>
        <p>Gifts</p>
        <p>Stationary</p>
      </div>
    </nav>
  )
}

export default Navbar