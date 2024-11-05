import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Auth endpoints
export const signup = async (userData) => {
  return await api.post('/auth/signup', userData);
};

export const login = async (userData) => {
  return await api.post('/auth/login', userData);
};

// Blog endpoints
export const fetchBlogs = async () => {
  return await api.get('/blogs'); 
};

export const fetchUserBlogs = async (userId) => {
  return await api.get(`/blogs/user/${userId}`); 
};

export const createBlog = async (blogData) => {
  return await api.post('/blogs', blogData); 
};

export const likeBlog = async (blogId) => {
  return await api.post(`/blogs/${blogId}/like`);
};

export const commentOnBlog = async (blogId, comment) => {
  return await api.post(`/blogs/${blogId}/comment`, { comment });
};

export const shareBlog = async (blogId) => {
  return await api.post(`/blogs/${blogId}/share`);
};

export default api;