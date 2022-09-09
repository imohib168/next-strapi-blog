import { AxiosResponse } from 'axios';
import React from 'react';
import { fetchArticles, fetchCategories } from '../../http';
import {
  IArticle,
  ICategory,
  ICollectionResponse,
  IPagination,
  IQueryOptions,
} from '../../types';
import qs from 'qs';
import Articles from '../../components/Articles';
import { UIPagination, UITabs } from '../../components';
import { useRouter } from 'next/router';
import { debounce, getTitle } from '../../utils/mock';
import Head from 'next/head';

interface ICategoryProps {
  categories: ICategory[];
  articles: IArticle[];
  articlePagination: IPagination;
}

const Category = ({
  categories,
  articles,
  articlePagination,
}: ICategoryProps) => {
  const router = useRouter();
  const { page, pageCount } = articlePagination;
  const { category: categorySlug } = router.query;

  const handleOnSearch = (text: string) => {
    router.push(`/category/${categorySlug}?search=${text}`);
  };

  return (
    <div>
      <Head>
        <title>{getTitle(categorySlug)} | Blog</title>
        <meta name='description' content="Coder's Blog - Blogs for everyone" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <UITabs
        categories={categories}
        handleOnSearch={debounce(handleOnSearch, 500)}
      />

      <Articles articles={articles} />

      {articles.length > 0 && (
        <UIPagination
          page={page}
          pageCount={pageCount}
          currentURL={`/category/${categorySlug}`}
        />
      )}
    </div>
  );
};

export default Category;

export const getServerSideProps = async ({
  query,
}: {
  query: { category: string; page: number; search: string };
}) => {
  const options: Partial<IQueryOptions> = {
    populate: ['author.avatar'],
    sort: ['id:desc'],
    filters: {
      category: {
        slug: query.category,
      },
    },
    pagination: {
      page: query.page ? +query.page : 1,
      pageSize: 10,
    },
  };

  if (query.search) options.filters = { title: { $containsi: query.search } };

  const queryString = qs.stringify(options);

  const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();

  const { data: articles }: AxiosResponse<ICollectionResponse<IArticle[]>> =
    await fetchArticles(queryString);

  return {
    props: {
      categories: categories.data,
      articles: articles.data,
      articlePagination: articles.meta.pagination,
    },
  };
};
