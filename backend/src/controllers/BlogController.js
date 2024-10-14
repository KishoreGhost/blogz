const Blog = require('../model/Blog.model');

// Create a new blog
const createBlog = async (req, res) => {
  const { title, content } = req.body;
  // const userId = req.user._id; 

  try {
    const newBlog = new Blog({
      title,
      content,
      // author: userId, 
      likes: 0,
      comments: []
    });
    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Error creating blog' });
  }
};

// Fetch all blogs with author details
const getAllBlogs = async (req, res) => {
  try {
    // const blogs = await Blog.find().populate('author', 'username email');
    const blogs = await Blog.find()
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Error fetching blogs' });
  }
};

// Fetch all blogs by a specific user
const getUserBlogs = async (req, res) => {
  const { userId } = req.params;

  try {
    const blogs = await Blog.find({ author: userId }).populate('author', 'username email');
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching user blogs:', error);
    res.status(500).json({ error: 'Error fetching user blogs' });
  }
};

// Like a blog
const likeBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    blog.likes += 1;
    await blog.save();
    res.status(200).json({ message: 'Blog liked successfully', likes: blog.likes });
  } catch (error) {
    console.error('Error liking blog:', error);
    res.status(500).json({ error: 'Error liking blog' });
  }
};

// Comment on a blog
const commentOnBlog = async (req, res) => {
  const { blogId } = req.params;
  const { comment } = req.body;
  const userId = req.user._id; 

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    blog.comments.push({ userId, comment });
    await blog.save();
    res.status(200).json({ message: 'Comment added successfully', comments: blog.comments });
  } catch (error) {
    console.error('Error commenting on blog:', error);
    res.status(500).json({ error: 'Error commenting on blog' });
  }
};

// Share a blog
const shareBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    // TODO: Implement logic for sharing a blog
    // For now, just return a success message
    res.status(200).json({ message: 'Blog shared successfully', blog });
  } catch (error) {
    console.error('Error sharing blog:', error);
    res.status(500).json({ error: 'Error sharing blog' });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getUserBlogs,
  likeBlog,
  commentOnBlog,
  shareBlog
};
