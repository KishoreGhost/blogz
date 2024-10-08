// src/routes/blogRoutes.js
const express = require('express');
const { createBlog, getAllBlogs, likeBlog, commentOnBlog, shareBlog } = require('../controllers/BlogController');
// const authenticate  = require('../middleware/authMiddleware').default; // Middleware to verify JWT
const blogRouter = express.Router();

blogRouter.post('/createBlog',createBlog); // Ensure user is authenticated

blogRouter.get('/', getAllBlogs);

blogRouter.post('/:blogId/like', likeBlog); // Ensure user is authenticated

blogRouter.post('/:blogId/comment', commentOnBlog); // Ensure user is authenticated

blogRouter.post('/:blogId/share', shareBlog); 

module.exports = blogRouter;
