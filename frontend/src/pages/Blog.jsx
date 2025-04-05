import { useState, useEffect } from "react";
import { api } from '../services/api';
import { FaCalendar, FaClock, FaSearch } from 'react-icons/fa';
import BlogCard from '../components/BlogCard';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [categories, setCategories] = useState(["All"]);

  // Fetch all tags when component mounts
  useEffect(() => {
    fetchAllTags();
  }, []);

  // Fetch blogs when page or category changes
  useEffect(() => {
    fetchBlogs();
  }, [currentPage, selectedCategory]);

  const fetchAllTags = async () => {
    try {
      // Get all blogs without pagination to extract all tags
      const response = await api.get('/blogs/all/tags');
      const allTags = ["All", ...new Set(response.flatMap(blog => blog.tags))];
      setCategories(allTags);
      console.log(allTags);
    } catch (err) {
      console.error('Error fetching all tags:', err);
    }
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const tag = selectedCategory === "All" ? "" : selectedCategory;
      const response = await api.get(`/blogs?page=${currentPage}&limit=9${tag ? `&tag=${tag}` : ''}`);

      setBlogs(response.blogs);
      setTotalPages(response.totalPages);
      setTotalBlogs(response.totalBlogs);
      setError(null);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = searchQuery === "" ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.introduction.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the filteredBlogs computation
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (error) return (
    <div role="alert" className="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{error}</span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Search */}
      <div className="hero bg-base-200 rounded-box mb-8">
        <div className="hero-content text-center py-10">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-4 text-primary">AI Solution's Blogs</h1>
            <p className="py-6">
              Explore the latest insights and developments in AI technology.
            </p>
            <form onSubmit={handleSearch} className="join w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  className="input input-bordered join-item w-full pl-10"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <button type="submit" className="btn btn-primary join-item">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Categories/Tags Tabs */}
      <div className="tabs tabs-boxed justify-center mb-8">
        {categories.map((category) => (
          <a
            key={category}
            className={`tab ${selectedCategory === category ? "tab-active" : ""}`}
            onClick={() => {
              console.log(category);
              setSelectedCategory(category);
              setCurrentPage(1); // Reset to first page when changing category
            }}
          >
            {category}
          </a>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No blogs match your search "${searchQuery}"`
                : "No blogs available in this category"}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}

      {/* Blog Count Info */}
      <div className="text-center text-gray-500 mt-4">
        Showing {filteredBlogs.length} of {totalBlogs} blogs
      </div>
    </div>
  );
};

export default Blog;
