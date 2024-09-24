import Image from 'next/image';

type bookProp ={
    name:string,
    image:string,
    description:string,
    price:number,
    author:string,
    genre:string,
    sold:number
}

const PageBook = ({book}:{book: bookProp}) => {
  return (
    <div className='flex flex-col items-center max-w-[10rem] h-3 hover:scale-110 duration-500 hover:cursor-pointer'>
        <Image src={book.image} alt={book.name} width={100} height={100} />
        <p>{book.name}</p>
        <p>£{book.price.toFixed(2)}</p>
    </div>
  )
}

export default PageBook