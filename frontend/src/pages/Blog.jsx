import { useState } from "react";
import { BLOG_CATEGORIES } from "../constants";
import { NavLink } from "react-router";
// Sample data for testing
const SAMPLE_BLOGS = [
  {
    _id: "1",
    title: "Introduction to Artificial Intelligence",
    content:
      "AI is transforming the way we live and work. Learn about the fundamentals of AI and its applications in various industries.",
    category: "AI Solutions",
    featured: true,
    createdAt: "2024-01-15",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
  {
    _id: "2",
    title: "Machine Learning Basics",
    content:
      "Discover the core concepts of machine learning and how it powers modern AI applications.",
    category: "Machine Learning",
    featured: false,
    createdAt: "2024-01-16",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
  {
    _id: "3",
    title: "Neural Networks Explained",
    content:
      "Deep dive into neural networks and their role in deep learning applications.",
    category: "Neural Networks",
    featured: true,
    createdAt: "2024-01-17",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
  {
    _id: "4",
    title: "Machine Learning Basics",
    content:
      "Discover the core concepts of machine learning and how it powers modern AI applications.",
    category: "Machine Learning",
    featured: false,
    createdAt: "2024-01-16",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
  {
    _id: "5",
    title: "Neural Networks Explained",
    content:
      "Deep dive into neural networks and their role in deep learning applications.",
    category: "Neural Networks",
    featured: true,
    createdAt: "2024-01-17",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading] = useState(false);
  const [error] = useState(null);
  const [blogs] = useState(SAMPLE_BLOGS);

  // Filter blogs based on selected category
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs?.filter((blog) => blog.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error loading blogs. Please try again later.</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
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

      {/* Categories Tabs */}
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
            className={`tab ${
              selectedCategory === category ? "tab-active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </a>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs?.map((blog) => (
          <div
            key={blog._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            {blog.image && (
              <figure>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title">
                {blog.title}
                {blog.featured && (
                  <div className="badge badge-secondary">Featured</div>
                )}
              </h2>
              <p className="line-clamp-3">{blog.content}</p>
              <div className="card-actions justify-between items-center mt-4">
                <div className="flex gap-2">
                  <div className="badge badge-outline">{blog.category}</div>
                  <div className="badge badge-ghost">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <NavLink to={`/blog/${blog._id}`} className="btn btn-primary btn-sm">
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </NavLink>
              </div>
            </div>
          </div>
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
