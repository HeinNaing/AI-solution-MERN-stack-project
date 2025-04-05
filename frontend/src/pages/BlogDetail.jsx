import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { FaArrowLeft, FaClock, FaCalendar, FaTags } from 'react-icons/fa';
import { api } from '../services/api';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogDetail();
    }, [id]);

    const fetchBlogDetail = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/blogs/${id}`);
            setBlog(response);
            setError(null);
        } catch (err) {
            console.error('Error fetching blog details:', err);
            setError('Failed to load blog details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                    <Link to="/blog" className="btn btn-sm">Return to Blogs</Link>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div role="alert" className="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Blog not found.</span>
                    <Link to="/blog" className="btn btn-sm">Return to Blogs</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Back Button */}
            <Link to="/blog" className="btn btn-ghost mb-6 gap-2">
                <FaArrowLeft /> Back to Blogs
            </Link>

            {/* Blog Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                        <FaCalendar />
                        <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaClock />
                        <span>{blog.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaTags />
                        <div className="flex gap-2">
                            {blog.tags.map((tag, index) => (
                                <span key={index} className="badge badge-outline">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Image */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden mb-8">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Blog Content */}
            <div className="prose max-w-none">
                {/* Introduction */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">{blog.content.introduction.title}</h2>
                    <p className="text-gray-700 whitespace-pre-line">{blog.content.introduction.text}</p>
                </div>

                {/* Sections */}
                {blog.content.sections.map((section, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                        <p className="text-gray-700 whitespace-pre-line">{section.text}</p>
                    </div>
                ))}

                {/* Conclusion */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">{blog.content.conclusion.title}</h2>
                    <p className="text-gray-700 whitespace-pre-line">{blog.content.conclusion.text}</p>
                </div>
            </div>

            {/* Author Section */}
            <div className="mt-12 p-6 bg-base-200 rounded-xl">
                <h3 className="text-xl font-bold mb-2">About the Author</h3>
                <p className="text-gray-700">{blog.author || 'AI Solutions Team'}</p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
                <Link to="/blog" className="btn btn-primary">
                    ← Back to All Blogs
                </Link>
            </div>
        </div>
    );
};

export default BlogDetail; 