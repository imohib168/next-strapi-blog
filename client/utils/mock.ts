import { serialize } from 'next-mdx-remote/serialize';
import { IArticle } from './../types/index';
import { IMenuItems } from '../types';

export const menuItems: IMenuItems[] = [
  {
    id: 'MMM1',
    label: 'Products',
    link: '/',
  },
  {
    id: 'MMM2',
    label: 'Pricing',
    link: '/',
  },
  {
    id: 'MMM3',
    label: 'Docs',
    link: '/',
  },
  {
    id: 'MMM4',
    label: 'Company',
    link: '/',
  },
];

export const basicBlogDetails = (article: IArticle) => {
  const {
    id,
    attributes: {
      slug,
      title,
      createdAt,
      shortDescription,
      author: {
        data: {
          attributes: {
            firstname,
            lastname,
            avatar: {
              data: {
                attributes: {
                  formats: {
                    thumbnail: { url },
                  },
                },
              },
            },
          },
        },
      },
    },
  } = article;

  return {
    id,
    slug,
    title,
    shortDescription,
    createdAt,
    firstname,
    lastname,
    url,
  };
};

export const articleDetails = (article: IArticle) => {
  const {
    attributes: {
      title,
      description,
      createdAt,
      image: {
        data: {
          attributes: { url: blogImage },
        },
      },
      author: {
        data: {
          attributes: {
            firstname,
            lastname,
            avatar: {
              data: {
                attributes: {
                  formats: {
                    thumbnail: { url: avatar },
                  },
                },
              },
            },
          },
        },
      },
    },
  } = article;

  return {
    title,
    description,
    createdAt,
    blogImage,
    avatar,
    firstname,
    lastname,
  };
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const debounce = (callback: (text: string) => void, timeout = 300) => {
  let timer: NodeJS.Timeout;

  const debounced = (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, timeout);
  };

  return debounced;
};

export const getTitle = (slug: string): string => {
  const spacedTitle = slug.split('-').join(' ');

  const capitalizeTitle =
    spacedTitle.charAt(0).toUpperCase() + spacedTitle.slice(1);

  return capitalizeTitle;
};

export const serializeMarkdown = async (item: IArticle) => {
  const description = await serialize(item.attributes.description as string);

  return {
    ...item,
    attributes: {
      ...item.attributes,
      description,
    },
  };
};
