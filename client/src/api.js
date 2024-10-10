import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const signup = async (userData) => {
  return await api.post('/signup', userData);
};

export const login = async (userData) => {
  return await api.post('/login', userData);
};

export const fetchBlogs = async () => {
  return await api.get('/blog');
};

export const createBlog = async (blogData) => {
  return await api.post('/createBlog', blogData);
};

