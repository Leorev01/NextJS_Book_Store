import Image from "next/image";
import Link from "next/link";
import accountIcon from '@/public/images/account_icon.jpg';
import basketIcon from '@/public/images/basket_icon.png';
import searchIcon from '@/public/images/search_icon.png';
import bookbuyLogo from '@/public/images/bookbuy_logo.png';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Cart from "./Cart";

const subheadings = [
  "Fiction",
  "Non-Fiction",
  "All Books",
  "Events",
  "Shops",
  "Gifts",
  "Stationary",
]


const Navbar = () => {
  return (
      <Dialog>
      <nav className="h-[11rem] border-b-2 fixed flex flex-col pb-3 z-50 bg-white">
        <div className='flex justify-between items-center'>
          <Link href='/account'>
            <div className="flex flex-row items-center ml-3">
                <p className="hover:cursor-pointer hover:scale-110">
                  ACCOUNT
                </p>
                <Image src={accountIcon} alt="account icon" width={50} height={50}/>
            </div>
          </Link>
          <Link href='/'>
            <Image src={bookbuyLogo} alt="bookbuy logo" width={200} height={200} className="mt-3" />
          </Link>
          <div className='mr-7 mt-2 flex flex-row items-center gap-2 pl-[8vw]'>
            <DialogTrigger>
              <Image className="w-auto h-auto" src={basketIcon} alt="basket icon" width={30} height={30}/>
              <p className="hover:cursor-pointer hover:scale-110">
                CART
              </p>
            </DialogTrigger>
          </div>
        </div>
        <div className="flex flex-row-reverse items-center mr-3 mt-4">
          <Image src={searchIcon} alt="search icon" width={20} height={20} className="absolute mr-2"/>
          <input placeholder="Search" maxLength={40} className="pl-3 outline-none border-2 border-black rounded-3xl w-[23rem] shadow-lg shadow-gray-500"/>
        </div>
        <div className="flex flex-row w-screen justify-around mt-3 self-center ">
          {subheadings.map((subheading) => (
            subheading === "All Books" ?
            <Link href="all" key={subheading}>
              <p className="hover:cursor-pointer hover:bg-gray-400 p-4 rounded-md">
                {subheading}
              </p>
            </Link> :
            <Link href={`/${subheading.toLowerCase()}`} key={subheading}>
              <p className="hover:cursor-pointer hover:bg-gray-400 p-4 rounded-md">{subheading}</p>
            </Link>
          ))}
        </div>
      </nav>
      <DialogContent className="bg-white">
        <Cart />
      </DialogContent>
    </Dialog>
  )
}

export default Navbar