import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { fetchBlogs, likeBlog, commentOnBlog, shareBlog } from "../../api";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetchBlogs();
        setBlogs(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  const handleLike = async (blogId) => {
    try {
      const response = await likeBlog(blogId);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId ? { ...blog, likes: response.data.likes } : blog
        )
      );
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  const handleComment = async (blogId) => {
    if (!commentText.trim()) return;
    
    try {
      const response = await commentOnBlog(blogId, commentText);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId
            ? { ...blog, comments: response.data.comments }
            : blog
        )
      );
      setCommentText("");
      setActiveCommentId(null);
    } catch (err) {
      console.error("Error commenting on blog:", err);
    }
  };

  const handleShare = async (blogId) => {
    try {
      await shareBlog(blogId);
      alert("Blog shared successfully!");
    } catch (err) {
      console.error("Error sharing blog:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/20 px-4 py-2 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white transition-colors duration-300">
          Latest Blogs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl dark:shadow-gray-900/30"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white transition-colors duration-300">
                  {blog.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 transition-colors duration-300">
                  {blog.content}
                </p>
              </div>

              <div className="px-6 pb-4">
                <div className="flex items-center justify-between border-t dark:border-gray-700 pt-4 transition-colors duration-300">
                  <button
                    onClick={() => handleLike(blog._id)}
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
                  >
                    <Heart
                      className={`h-5 w-5 transition-colors duration-300 ${
                        blog.likes > 0 ? "fill-current text-red-500" : ""
                      }`}
                    />
                    <span>{blog.likes}</span>
                  </button>

                  <button
                    onClick={() =>
                      setActiveCommentId(
                        activeCommentId === blog._id ? null : blog._id
                      )
                    }
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>{blog.comments?.length || 0}</span>
                  </button>

                  <button
                    onClick={() => handleShare(blog._id)}
                    className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-300"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                {activeCommentId === blog._id && (
                  <div className="mt-4 space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                      />
                      <button
                        onClick={() => handleComment(blog._id)}
                        disabled={!commentText.trim()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
                      >
                        Post
                      </button>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                      {blog.comments?.map((comment, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg transition-colors duration-300"
                        >
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            {comment.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;