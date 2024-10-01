'use client';

import{ books }from "@/data/books";
import { useParams } from "next/navigation"
import AddButton from "@/components/AddButton";
import { motion } from 'framer-motion';

type bookProp = {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    author: string;
    genre: string;
    sold: number;
    releaseDate: string;
}

const BookPage = () => {

    const { slug } = useParams()
    const book = books.find((book:bookProp) => book.id.toString() === slug);

    if (!book) {
        return <div className="pt-[11rem] text-center text-3xl font-bold">Book not found</div>
    }

  return (
    <section className="pt-[11rem] flex flex-row h-screen items-center justify-evenly">
        <motion.img
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        src={book!.image} alt={book!.title} width={300} height={300}/>
        <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col text-center justify-center w-[30rem] h-[30rem] bg-gray-200 gap-5">
            <h1><strong>{book?.title}</strong></h1>
            <p><strong>{book?.author}</strong></p>
            <p>{book?.genre}</p>
            <p className="px-[5rem]">{book?.description}</p>
            <p>RRP: <strong>£{book?.price}</strong></p>
            <AddButton item={book!} classes="self-center margin-0"/>
        </motion.div>
        
        
    </section>
  )
}

export default BookPage;