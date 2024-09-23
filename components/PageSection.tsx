import PageBook from './PageBook'
//import {useState, useEffect} from 'react';
import {books} from '@/data/books';

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
    /*const [bookList, setBooks] = useState<BookProp[]>([]);

    useEffect(() => {
        const fetchBooks = async (filter: string) => {
            let sortedBooks = [];
            const response = await fetch('/public/data/books.json');
            const books = await response.json();

            if (filter === 'bestsellers') {
                sortedBooks = books
                    .sort((a: { sold: number }, b: { sold: number }) => b.sold - a.sold)
                    .slice(0, 6);
            } else {
                sortedBooks = books
                    .filter((book: { genre: string }) => book.genre === filter)
                    .slice(0, 6);
            }

            setBooks(sortedBooks);
        };

        fetchBooks(title.toLowerCase());

    }, []);*/

  return (
    <section>
        <h1 className='text-3xl font-bold w-screen ml-20 my-5'>{title}</h1>
        <div className='flex flex-row flex-wrap justify-evenly'>
            {books.slice(0, 6).map((book) => (
                <PageBook key={book.name} book={book} />
                
            ))}
        </div>
        
    </section>
  )
}

export default PageSection