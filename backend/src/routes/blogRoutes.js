const express = require('express');
const { createBlog, getAllBlogs, likeBlog, commentOnBlog, shareBlog } = require('../controllers/BlogController');

const blogRouter = express.Router();

blogRouter.post('/createBlog', createBlog); 
blogRouter.get('/', getAllBlogs);
blogRouter.post('/:blogId/like', likeBlog);
blogRouter.post('/:blogId/comment', commentOnBlog);
blogRouter.post('/:blogId/share', shareBlog);

module.exports = blogRouter;
