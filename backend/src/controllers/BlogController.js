const Blog = require('../model/Blog.model');
// const User = require('../model/User.model');

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const newBlog = new Blog({
      title,
      content,
      author: userId,
      likes: 0,
      comments: []
    });
    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ error: 'Error creating blog' });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username email');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blogs' });
  }
};

const likeBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    blog.likes += 1;
    await blog.save();
    res.json({ message: 'Blog liked successfully', likes: blog.likes });
  } catch (error) {
    res.status(500).json({ error: 'Error liking blog' });
  }
};

const commentOnBlog = async (req, res) => {
  const { blogId } = req.params;
  const { comment } = req.body;
  const userId = req.user.id;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    blog.comments.push({ userId, comment });
    await blog.save();
    res.json({ message: 'Comment added successfully', comments: blog.comments });
  } catch (error) {
    res.status(500).json({ error: 'Error commenting on blog' });
  }
};

const shareBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    TODO: // Here, you can implement the logic to share the blog
    // For now, we will just return a success message
    res.json({ message: 'Blog shared successfully', blog });
  } catch (error) {
    res.status(500).json({ error: 'Error sharing blog' });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  likeBlog,
  commentOnBlog,
  shareBlog
};
