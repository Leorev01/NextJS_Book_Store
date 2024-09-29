'use client';

import PageBook from './PageBook'
import {useState, useEffect} from 'react';
import {books} from '@/data/books';
import { ClipLoader } from 'react-spinners';

type BookProp = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    author: string;
    genre: string;
    sold: number;
    releaseDate: string;
};

const BookSection = ({title, genre}: {title:string, genre?:string}) => {
    const [bookList, setBooks] = useState<BookProp[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = (filter: string) => {
            setIsLoading(true);
            let sortedBooks = books;
            if(genre){
                sortedBooks = sortedBooks
                .filter((book) => book.genre.toLowerCase() === genre);
            }
            if(filter === 'all'){
                
            }
            else if (filter === 'bestsellers') {
                sortedBooks = sortedBooks
                .sort((a,b) => b.sold - a.sold)
                .slice(0, 5);
            } else if(filter === 'new'){
                sortedBooks = sortedBooks
                .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
                .slice(0, 5);
            } else {
                sortedBooks = sortedBooks
                .filter((book) => book.genre.toLowerCase() === filter)
                .slice(0, 5);
            }

            setBooks(sortedBooks);
            setIsLoading(false);
        };

        fetchBooks(title.toLowerCase());

    }, [title, genre]);
    

  return (
    <section className='w-[97vw]'>
        {title !== 'all' && <h1 className='text-3xl font-bold ml-10 my-5'>{title}</h1>}
        <div className='grid grid-cols-5'>
            <ClipLoader size={30} color="black" loading={isLoading}/>
            {bookList.map((book) => (
                <PageBook key={book.name} book={book} />
            ))}
        </div>
        
    </section>
  )
}

export default BookSection