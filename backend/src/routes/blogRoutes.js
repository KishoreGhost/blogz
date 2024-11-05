const express = require('express');
const { createBlog, getAllBlogs, getUserBlogs, likeBlog, commentOnBlog, shareBlog } = require('../controllers/BlogController');

const blogRouter = express.Router();

blogRouter.post('/', createBlog); 
blogRouter.get('/', getAllBlogs); 
blogRouter.get('/user/:userId', getUserBlogs); 
blogRouter.post('/:blogId/like', likeBlog);
blogRouter.post('/:blogId/comment', commentOnBlog);
blogRouter.post('/:blogId/share', shareBlog);

module.exports = blogRouter;