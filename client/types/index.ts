import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface IMenuItems {
  id: string;
  label: string;
  link: string;
}

export interface ICategoryAttribute {
  title: string;
  slug: string;
}

export interface ICategory {
  id: number;
  attributes: ICategoryAttribute;
}

export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface IMeta {
  pagination: IPagination;
}

export interface ICollectionResponse<T> {
  data: T;
  meta: IMeta;
}

export interface IImage {
  data: {
    attributes: {
      url: string;
      formats: {
        small: {
          url: string;
        };
      };
    };
  };
}

export interface IUserAvatar {
  data: {
    attributes: {
      formats: {
        thumbnail: {
          url: string;
        };
      };
    };
  };
}

export interface IAuthor {
  data: {
    attributes: {
      firstname: string;
      lastname: string;
      avatar: IUserAvatar;
    };
  };
}

export interface IArticleAttribute {
  title: string;
  description: string | MDXRemoteSerializeResult;
  slug: string;
  createdAt: string;
  image: IImage;
  author: IAuthor;
  shortDescription: string;
}

export interface IArticle {
  id: number;
  attributes: IArticleAttribute;
}

export interface IQueryOptions {
  populate: unknown;
  sort: unknown;
  filters: unknown;
  pagination: {
    page: number;
    pageSize: number;
  };
}
