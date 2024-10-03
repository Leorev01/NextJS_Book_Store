'use client';

import PageBook from './PageBook';
import { useState, useEffect } from 'react';
import { books } from '@/data/books';
import { motion } from 'framer-motion';

type BookProp = {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    author: string;
    genre: string;
    sold: number;
    releaseDate: string;
};

const BookSection = ({ title, genre }: { title: string; genre?: string }) => {
    const [bookList, setBooks] = useState<BookProp[]>([]);

    useEffect(() => {
        const fetchBooks = (filter: string) => {
            let sortedBooks = books;
            if (genre) {
                sortedBooks = sortedBooks.filter((book) => book.genre.toLowerCase() === genre);
            }
            if (filter === 'all') {
                // Keep all books
            } else if (filter === 'bestsellers') {
                sortedBooks = sortedBooks.sort((a, b) => b.sold - a.sold).slice(0, 5);
            } else if (filter === 'new') {
                sortedBooks = sortedBooks
                    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
                    .slice(0, 5);
            } else {
                sortedBooks = sortedBooks.filter((book) => book.genre.toLowerCase() === filter).slice(0, 5);
            }

            setBooks(sortedBooks);
        };

        fetchBooks(title.toLowerCase());
    }, [title, genre]);

    // Animation variants for the container and child elements
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Stagger the children animation by 0.3 seconds
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, scale: 0.5 }, 
        show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    };

    return (
        <section className='w-[97vw]'>
            {title !== 'all' && <h1 className='text-3xl font-bold ml-10 my-5'>{title}</h1>}
            <motion.div
                className='grid grid-cols-5 gap-4'
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {bookList.map((book) => (
                    <motion.div key={book.id} variants={childVariants}>
                        <PageBook book={book} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default BookSection;