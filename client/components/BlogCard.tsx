import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IArticle } from '../types';
import { basicBlogDetails, formatDate } from '../utils/mock';

interface IBlogCardProps {
  article: IArticle;
}

const BlogCard = ({ article }: IBlogCardProps) => {
  const { slug, title, createdAt, firstname, lastname, url, shortDescription } =
    basicBlogDetails(article);

  return (
    <div>
      <Link href={`/article/${slug}`}>
        <span className='text-gray-800 text-lg font-bold hover:cursor-pointer hover:text-primary-dark text-hover'>
          {title}
        </span>
      </Link>

      <div className='mt-2'>
        <div className='flex items-center'>
          <Image
            src={`http://localhost:1337${url}`}
            alt='user profile icon'
            width={40}
            height={40}
            className='rounded-md'
          />

          <span className='text-sm font-bold text-gray-600 ml-2'>
            {firstname} {lastname}
            <span className='text-gray-400 ml-2 '>{formatDate(createdAt)}</span>
          </span>
        </div>

        <p className='text-gray-500 text-sm mt-2'>
          {shortDescription.length > 250
            ? shortDescription.slice(0, 250) + ' ...'
            : shortDescription}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
