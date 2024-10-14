const express = require('express');
const { createBlog, getAllBlogs, getUserBlogs, likeBlog, commentOnBlog, shareBlog } = require('../controllers/BlogController');

const blogRouter = express.Router();

blogRouter.post('/createBlog', createBlog);
blogRouter.get('/blog', getAllBlogs);
blogRouter.get('/user/:userId/blogs', getUserBlogs);
blogRouter.post('/:blogId/like', likeBlog);
blogRouter.post('/:blogId/comment', commentOnBlog);
blogRouter.post('/:blogId/share', shareBlog);

module.exports = blogRouter;
