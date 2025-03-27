import { useState } from "react";
import { NavLink } from "react-router";
import { blogPosts } from '../data/blogPosts';
import { FaCalendar, FaClock } from 'react-icons/fa';
import BlogCard from '../components/BlogCard';

// Get unique categories from blogPosts
const BLOG_CATEGORIES = [...new Set(blogPosts.flatMap(post => post.tags))];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading] = useState(false);
  const [error] = useState(null);

  // Filter blogs based on selected category/tag
  const filteredBlogs = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.tags.includes(selectedCategory));

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
      <span>Error loading blogs. Please try again later.</span>
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
            <div className="join">
              <input
                className="input input-bordered join-item"
                placeholder="Search articles..."
              />
              <button className="btn btn-primary join-item">Search</button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories/Tags Tabs */}
      <div className="tabs tabs-boxed justify-center mb-8">
        <a
          className={`tab ${selectedCategory === "All" ? "tab-active" : ""}`}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </a>
        {BLOG_CATEGORIES.map((category) => (
          <a
            key={category}
            className={`tab ${selectedCategory === category ? "tab-active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </a>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs?.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="join">
          <button className="join-item btn">«</button>
          <button className="join-item btn btn-active">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
