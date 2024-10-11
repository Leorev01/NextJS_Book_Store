'use client';

import { stationary } from "@/data/stationary";
import { useParams } from "next/navigation"
import AddButton from "@/components/AddButton";
import { motion } from 'framer-motion';

type stationaryProp = {
    id: number;
    title: string;
    image: string;
    price: number;
}

const BookPage = () => {

    const { slug } = useParams()
    const item = stationary.find((item:stationaryProp) => item.id.toString() === slug);

    if (!item) {
        return <div className="pt-[11rem] text-center text-3xl font-bold">Item not found</div>
    }

  return (
    <section className="pt-[11rem] flex flex-row h-screen items-center justify-evenly">
        <motion.img
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        src={item!.image} alt={item!.title} width={300} height={300}/>
        <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col text-center justify-center w-[30rem] h-[30rem] bg-gray-200 gap-5">
            <h1><strong>{item?.title}</strong></h1>
            <p>RRP: <strong>£{item?.price}</strong></p>
            <AddButton item={item!} classes="self-center margin-0"/>
        </motion.div>
        
        
    </section>
  )
}

export default BookPage;