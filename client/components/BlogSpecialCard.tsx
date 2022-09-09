import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IArticle } from '../types';
import { basicBlogDetails } from '../utils/mock';

interface IBlogSpecialCardProps {
  article: IArticle;
}

const BlogSpecialCard = ({ article }: IBlogSpecialCardProps) => {
  const { slug, title } = basicBlogDetails(article);

  return (
    <div className='bg-gradient-to-r from-primary to-primary-dark p-4 rounded-lg'>
      <div className='flex items-center justify-around'>
        <Link href={`/article/${slug}`}>
          <span
            className={`text-white text-2xl w-2/3 font-bold hover:cursor-pointer pb-2 after:bg-primary-dark after:block after:w-16 after:h-1 after:content-[''] after:mt-2`}
          >
            {title}
          </span>
        </Link>

        <Image src='/gitbook.svg' alt='Git book' width={140} height={140} />
      </div>
    </div>
  );
};

export default BlogSpecialCard;
