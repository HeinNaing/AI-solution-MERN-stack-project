import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaCalendar, FaShare, FaClock } from 'react-icons/fa';
import { blogPosts } from '../data/blogPosts';
import { useParams } from 'react-router';

const BlogDetail = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const { id } = useParams();
    const post = blogPosts.find(post => post.id === parseInt(id));

    if (!post) return <div>Blog post not found</div>;

    return (
        <div className={`min-h-screen pt-24 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
            <div className="max-w-3xl mx-auto px-4">
                {/* Blog Header */}
                <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-semibold mb-4 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <FaCalendar className="text-blue-500" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaClock className="text-blue-500" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </div>

                {/* Blog Image */}
                <div className="w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden mb-8 shadow-lg">
                    <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Blog Content */}
                <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
                    {/* Introduction */}
                    <div className="text-lg leading-relaxed space-y-6">
                        <h2 className="text-2xl font-semibold mt-8 mb-4">
                            {post.content.introduction.title}
                        </h2>
                        <p>{post.content.introduction.text}</p>

                        {/* Main Sections */}
                        {post.content.sections.map((section, index) => (
                            <div key={index}>
                                <h2 className="text-2xl font-semibold mt-8 mb-4">
                                    {section.title}
                                </h2>
                                <p>{section.text}</p>
                                {section.quote && (
                                    <blockquote className={`border-l-4 border-blue-500 pl-4 my-8 italic ${
                                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                        {section.quote}
                                    </blockquote>
                                )}
                            </div>
                        ))}

                        {/* Conclusion */}
                        <h2 className="text-2xl font-semibold mt-8 mb-4">
                            {post.content.conclusion.title}
                        </h2>
                        <p>{post.content.conclusion.text}</p>
                    </div>
                </div>

                {/* Share Section */}
                <div className="mt-12 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">Share this article:</span>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <FaShare className="text-blue-500" />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            {post.tags.map(tag => (
                                <span 
                                    key={tag} 
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        isDarkMode 
                                            ? 'bg-gray-800 text-gray-300' 
                                            : 'bg-gray-100 text-gray-600'
                                    }`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail; 