import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ICategory } from '../types';

interface ITabsProps {
  categories: ICategory[];
  handleOnSearch: (text: string) => void;
}

const Tabs = ({ categories, handleOnSearch }: ITabsProps) => {
  const {
    pathname,
    query: { category },
  } = useRouter();

  const isActiveLink = (slug: string) => {
    return slug === category;
  };

  return (
    <div>
      <div className='border-2 p-4 rounded-md border-primary lg:p-0 lg:border-0 lg:border-b-2 lg:border-gray-100 mb-6'>
        <div className='flex-col lg:flex lg:flex-row justify-between'>
          <ul className='flex-col lg:flex lg:flex-row items-center'>
            <li
              className={`mb:3 lg:mb-0 mr-6 pb-1 lg:pb-3 text-gray-600 lg:border-b-4 rounded-sm ${
                pathname === '/'
                  ? 'border-0 lg:border-primary text-primary'
                  : 'border-transparent'
              }`}
            >
              <Link href='/'>Recent</Link>
            </li>

            {categories.map((category) => {
              const {
                id,
                attributes: { slug, title },
              } = category;

              return (
                <li
                  key={id}
                  className={`mb:3 lg:mb-0 mr-6 pb-1 lg:pb-3 text-gray-600 lg:border-b-4 rounded-sm ${
                    isActiveLink(slug)
                      ? 'border-0 lg:border-primary text-primary'
                      : 'border-transparent'
                  }`}
                >
                  <Link href={`/category/${slug}`}>{title}</Link>
                </li>
              );
            })}
          </ul>
          <div className='my-2 lg:my-0 flex items-center'>
            <svg
              className='h-4 fill-gray-500'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
            >
              <path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z' />
            </svg>
            <input
              onChange={(e) => handleOnSearch(e.target.value)}
              type='text'
              placeholder='Search'
              className='outline-none w-full lg:w-auto px-2 my:18 py-1 lg:ml-1'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
