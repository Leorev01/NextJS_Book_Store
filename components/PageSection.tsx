'use client';

import PageBook from './PageBook'
import {useState, useEffect} from 'react';
import {books} from '@/data/books';
import { ClipLoader } from 'react-spinners';

type BookProp = {
    name: string;
    image: string;
    description: string;
    price: number;
    author: string;
    genre: string;
    sold: number;
};

const PageSection = ({title}: {title:string}) => {
    const [bookList, setBooks] = useState<BookProp[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = (filter: string) => {
            let sortedBooks = [];

            if (filter === 'bestsellers') {
                sortedBooks = books
                .sort((a: { sold: number }, b: { sold: number }) => b.sold - a.sold)
                .slice(0, 5);
            } else if(filter === 'new'){
                sortedBooks = books
                .sort((a: { releaseDate: string }, b: { releaseDate: string }) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
                .slice(0, 5);
            } else {
                sortedBooks = books
                .filter((book: { genre: string }) => book.genre.toLowerCase() === filter)
                .slice(0, 5);
            }

            setBooks(sortedBooks);
        };

        fetchBooks(title.toLowerCase());
        setIsLoading(false);

    }, []);

  return (
    <section className='py-24 w-screen'>
        <h1 className='text-3xl font-bold w-screen ml-20 my-5'>{title}</h1>
        <div className='flex flex-row flex-wrap justify-evenly'>
            <ClipLoader size={30} color="black" loading={isLoading}/>
            {bookList.slice(0, 6).map((book) => (
                <PageBook key={book.name} book={book} />
                
            ))}
        </div>
        
    </section>
  )
}

export default PageSection