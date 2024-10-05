import Image from 'next/image';
import AddButton from './AddButton';
import Link from 'next/link';

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

const PageBook = ({ book }: { book: bookProp }) => {
    return (
        <div className='mt-10 flex flex-col items-center min-w-[10rem] h-[18rem] md:h-[20rem] lg:h-[25rem]'> {/* Adjusted height here */}
            <div className='flex flex-col items-center hover:scale-105 duration-500 hover:cursor-pointer flex-grow p-0'>
                <Link href={`/all/${book.id}`}><Image src={book.image} alt={book.title} width={100} height={100} className='md:w-[7rem] lg:w-[10rem]'/></Link>
                <p className='text-center'>{book.title}</p>
                <p className='font-bold'>£{book.price.toFixed(2)}</p>
            </div>
            <AddButton item={book}/>
        </div>
    )
}

export default PageBook;
