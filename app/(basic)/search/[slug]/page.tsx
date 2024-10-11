'use client';

import { useParams } from 'next/navigation';
import { books } from '@/data/books';
import { stationary } from '@/data/stationary';
import { useEffect, useState } from 'react';
import PageBook from '@/components/PageBook';
import StationaryItem from '@/components/StationaryItem';

type bookType = {
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
type stationaryType = {
    id: number;
    title: string;
    price: number;
    image: string;
}

const SearchValuePage = () => {

    const { slug: searchParams } = useParams();
    const searchValue = decodeURIComponent(searchParams as string); // Decode the URL parameter to handle '%20' and other encoded characters
    const [filteredBooks, setFilteredBooks] = useState<bookType[]>([]);
    const [filteredStationary, setFilteredStationary] = useState<stationaryType[]>([]);

    useEffect(() => {
        const findItems = () => {
            const filBooks = books.filter((book) => book.title.toLowerCase().includes(searchValue.toLowerCase()));
            const filStationary = stationary.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
            setFilteredBooks(filBooks);
            setFilteredStationary(filStationary);
        };
        findItems();
        console.log(searchValue);
    }, [searchValue]);

    if (filteredBooks.length === 0 && filteredStationary.length === 0) {
        return (
            <h1 className='pt-[11rem]'>No items found</h1>
        );
    }

    return (
        <section className='pt-[11rem]'>
            {filteredBooks.map(book => (
                <PageBook key={book.id} book={book} />
            ))}
            {filteredStationary.map(item => (
                <StationaryItem key={item.id} stationary={item} />
            ))}
        </section>
    );
}

export default SearchValuePage;
