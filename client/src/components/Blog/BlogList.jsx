  import React, { useEffect, useState } from "react";
  import { Heart, MessageCircle, Share2, Trash2, Edit } from "lucide-react";
  import { fetchBlogs } from "../../api";

  const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [activeCommentId, setActiveCommentId] = useState(null);

    useEffect(() => {
      const getBlogs = async () => {
        try {
          const response = await fetchBlogs();
          setBlogs(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      getBlogs();
    }, []);

    const handleLike = async (blogId) => {
      try {
        const response = await fetch(`/blogs/${blogId}/like`, {
          method: 'POST'
        });
        const data = await response.json();
        
        // Update blogs state with new like count
        setBlogs(blogs.map(blog => 
          blog._id === blogId ? { ...blog, likes: data.likes } : blog
        ));
      } catch (err) {
        console.error('Error liking blog:', err);
      }
    };

    const handleComment = async (blogId) => {
      try {
        const response = await fetch(`/api/blogs/${blogId}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ comment: commentText })
        });
        const data = await response.json();
        
        // Update blogs state with new comment
        setBlogs(blogs.map(blog => 
          blog._id === blogId ? { ...blog, comments: data.comments } : blog
        ));
        setCommentText("");
        setActiveCommentId(null);
      } catch (err) {
        console.error('Error commenting on blog:', err);
      }
    };

    const handleShare = async (blogId) => {
      try {
        await fetch(`/api/blogs/${blogId}/share`, {
          method: 'POST'
        });
        // Handle successful share (e.g., show a success message)
      } catch (err) {
        console.error('Error sharing blog:', err);
      }
    };

    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-500 dark:text-red-400">Error: {error}</div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Latest Blogs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article key={blog._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              {/* Blog Header */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {blog.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {blog.content}
                </p>
              </div>

              {/* Interaction Section */}
              <div className="px-6 pb-4">
                <div className="flex items-center justify-between border-t dark:border-gray-700 pt-4">
                  <button 
                    onClick={() => handleLike(blog._id)}
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                  >
                    <Heart className={`h-5 w-5 ${blog.likes > 0 ? 'fill-current text-red-500' : ''}`} />
                    <span>{blog.likes}</span>
                  </button>

                  {/* Comment Button */}
                  <button 
                    onClick={() => setActiveCommentId(activeCommentId === blog._id ? null : blog._id)}
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>{blog.comments?.length || 0}</span>
                  </button>

                  {/* Share Button */}
                  <button 
                    onClick={() => handleShare(blog._id)}
                    className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Comment Section */}
                {activeCommentId === blog._id && (
                  <div className="mt-4 space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleComment(blog._id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Post
                      </button>
                    </div>
                    
                    {/* Comments List */}
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {blog.comments?.map((comment, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-300">{comment.comment}</p>
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
    );
  };

  export default BlogList;