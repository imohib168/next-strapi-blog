import { AxiosResponse } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import { fetchArticles, fetchCategories } from '../http';
import {
  IArticle,
  ICategory,
  ICollectionResponse,
  IPagination,
  IQueryOptions,
} from '../types';
import qs from 'qs';
import { UIArticles, UIPagination, UITabs } from '../components';
import { useRouter } from 'next/router';
import { debounce } from '../utils/mock';

interface IHomeProps {
  categories: ICategory[];
  articles: IArticle[];
  articlePagination: IPagination;
}

const Home: NextPage<IHomeProps> = ({
  categories,
  articles,
  articlePagination,
}) => {
  const router = useRouter();
  const { page, pageCount } = articlePagination;

  const handleOnSearch = (text: string) => {
    router.push(`/?search=${text}`);
  };

  return (
    <div>
      <Head>
        <title>Home | Blog</title>
        <meta name='description' content="Coder's Blog - Blogs for everyone" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <UITabs
        categories={categories}
        handleOnSearch={debounce(handleOnSearch, 500)}
      />

      <UIArticles articles={articles} />

      {articles.length > 0 && (
        <UIPagination page={page} pageCount={pageCount} />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async ({
  query,
}: {
  query: { page: number; search: string };
}) => {
  const options: Partial<IQueryOptions> = {
    populate: ['author.avatar'],
    sort: ['id:desc'],
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
