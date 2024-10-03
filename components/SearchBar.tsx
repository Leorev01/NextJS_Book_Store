'use client';

import Image from "next/image";
import searchIcon from '@/public/images/search_icon.png';
import {useRef} from "react";
import {books} from '@/data/books';
import { useRouter } from "next/navigation";

const SearchBar = () => {

    const searchRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const searchHandler = ()=>{
        const searchValue = searchRef.current?.value.trim();
        const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchValue as string));
        console.log(filteredBooks)
        router.push('/search/'+searchValue?.toLowerCase())
    }

  return (
    <div className="flex flex-row-reverse items-center mr-5 mt-4">
          <Image onClick={searchHandler} src={searchIcon} alt="search icon" width={20} height={20} className="absolute mr-2 hover:scale-110 duration-200 cursor-pointer"/>
          <input placeholder="Search" maxLength={40} ref={searchRef} 
          className="pl-3 outline-none border-2 border-black rounded-3xl w-[23rem] shadow-lg shadow-gray-500"/>
        </div>
  )
}

export default SearchBar