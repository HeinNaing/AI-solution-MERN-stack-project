import React from 'react';
import { NavLink } from 'react-router';
import { FaCalendar, FaClock } from 'react-icons/fa';

const BlogCard = ({ post }) => {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            {post.image && (
                <figure className="relative overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                </figure>
            )}
            <div className="card-body">
                <h2 className="card-title line-clamp-2">{post.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500 my-2">
                    <div className="flex items-center gap-1">
                        <FaCalendar className="text-primary" />
                        <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaClock className="text-primary" />
                        <span>{post.readTime}</span>
                    </div>
                </div>
                <p className="line-clamp-2">
                    {post.content.introduction.text.slice(0, 100) + "..."}
                </p>
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex gap-2 flex-wrap">
                        {post.tags.map(tag => (
                            <div key={tag} className="badge badge-outline">{tag}</div>
                        ))}
                    </div>
                    <NavLink
                        to={`/blog/${post._id}`}
                        className="btn btn-primary w-full"
                    >
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
    );
};

export default BlogCard; 