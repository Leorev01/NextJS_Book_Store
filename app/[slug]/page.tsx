'use client';
import PageSection from "@/components/BookSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";

const Genre = () => {
  let { slug } = useParams();
  slug = slug.toString();

  return (
    <section className='pt-[11rem] flex flex-col items-center w-full'>
      <div className='w-full h-0 border-x-[20rem] border-b-[3rem] border-transparent border-b-gray-300 rotate-180 mb-0'></div>
      <h1 className="text-2xl font-bold relative bottom-10">
        {slug.toUpperCase()}
      </h1>
      <Link href={`/${slug.toLowerCase()}/all`} className="z-10">
        <Button className="mb-20">
          View all in {slug}
        </Button>
      </Link>
      <div className="mt-[-5rem]">
        <PageSection title='Bestsellers' genre={slug}/>
        <PageSection title='New' genre={slug}/>
      </div>
    </section>
  );
}

export default Genre;
