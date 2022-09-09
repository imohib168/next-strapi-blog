import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

export const fetchCategories = async () => api.get('/categories');

export const fetchArticles = async (queryString: string) =>
  api.get(`/articles?${queryString}`);

export const fetchArticle = async (queryString: string) =>
  api.get(`/articles?${queryString}`);
