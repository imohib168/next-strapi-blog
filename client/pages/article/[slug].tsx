import React from 'react';
import qs from 'qs';
import { fetchArticle } from '../../http';
import { IArticle, ICollectionResponse } from '../../types';
import { AxiosResponse } from 'axios';
import {
  articleDetails,
  formatDate,
  serializeMarkdown,
} from '../../utils/mock';
import Image from 'next/image';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface IArticleProps {
  article: IArticle;
}

const Article = ({ article }: IArticleProps) => {
  const {
    title,
    description,
    createdAt,
    blogImage,
    avatar,
    firstname,
    lastname,
  } = articleDetails(article);

  return (
    <div className='grid lg:grid-cols-3 gap-16 my-12'>
      <div className='col-span-2'>
        <h1 className='text-gray-700 text-3xl font-bold pb-2'>{title}</h1>

        <div className='mt-2 flex items-center'>
          <Image
            src={`http://localhost:1337${avatar}`}
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

        <div className='relative my-6'>
          <Image
            className='rounded-md'
            src={`http://localhost:1337${blogImage}`}
            alt='blog image'
            width='100%'
            height='60%'
            layout='responsive'
            objectFit='cover'
          />
        </div>

        <div className='description my-4'>
          <MDXRemote {...(description as MDXRemoteSerializeResult)} />
        </div>
      </div>

      <div className='sticky top-0'>2</div>
    </div>
  );
};

export default Article;

export const getServerSideProps = async ({
  query,
}: {
  query: { slug: string };
}) => {
  const options = {
    populate: ['image', 'author.avatar'],
    filters: {
      slug: {
        $eq: query.slug,
      },
    },
  };

  const querystring = qs.stringify(options);

  const { data: article }: AxiosResponse<ICollectionResponse<IArticle[]>> =
    await fetchArticle(querystring);

  if (article.data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article: await serializeMarkdown(article.data[0]),
    },
  };
};
