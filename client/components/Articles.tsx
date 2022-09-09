import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IArticle } from '../types';
import BlogCard from './BlogCard';
import BlogSpecialCard from './BlogSpecialCard';

interface IArtcleProps {
  articles: IArticle[];
}

const Articles = ({ articles }: IArtcleProps) => {
  return (
    <div className='grid lg:grid-cols-2 grid-gap gap-16 mt-10'>
      {articles.map((article, index) => {
        return (
          <div key={article.id}>
            {index === 1 ? (
              <BlogSpecialCard article={article} />
            ) : (
              <BlogCard article={article} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Articles;
