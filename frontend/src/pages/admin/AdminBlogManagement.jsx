import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';

const AdminBlogManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        tags: '',
        content: {
            introduction: {
                title: '',
                text: ''
            },
            sections: [],
            conclusion: {
                title: '',
                text: ''
            }
        }
    });

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/v1/blogs?page=${currentPage}`);
                const data = await response.json();
                setBlogs(data.blogs);
                setTotalBlogs(data.totalBlogs);
                setTotalPages(data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [currentPage]);

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            image: blog.image,
            tags: blog.tags.join(', '),
            content: blog.content
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await fetch(`/api/v1/blogs/${blogId}`, {
                    method: 'DELETE'
                });
                fetchBlogs();
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
        setFormData({
            title: '',
            image: '',
            tags: '',
            content: {
                introduction: {
                    title: '',
                    text: ''
                },
                sections: [],
                conclusion: {
                    title: '',
                    text: ''
                }
            }
        });
    };

    return (
        <div className="min-h-screen p-8">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Blog Management</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary flex items-center gap-2"
                >
                    <FaPlus /> Create New Blog
                </button>
            </div>

            {/* Search and Filter Section */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        className="input input-bordered w-full pr-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <select className="select select-bordered w-48">
                    <option value="">All Tags</option>
                    <option value="AI">AI</option>
                    <option value="Machine Learning">Machine Learning</option>
                    {/* Add more tag options */}
                </select>
            </div>

            {/* Blog List Table */}
            <div className="bg-base-100 rounded-lg shadow-xl">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Tags</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id}>
                                <td className="max-w-md">
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="font-medium">{blog.title}</div>
                                    </div>
                                </td>
                                <td>{blog.date}</td>
                                <td>
                                    <div className="flex gap-1 flex-wrap">
                                        {blog.tags.map(tag => (
                                            <span key={tag} className="badge badge-outline">{tag}</span>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge ${blog.isPublished ? 'badge-success' : 'badge-warning'}`}>
                                        {blog.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="btn btn-square btn-sm btn-ghost"
                                        >
                                            <FaEdit className="text-blue-500" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="btn btn-square btn-sm btn-ghost"
                                        >
                                            <FaTrash className="text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                    {loading ? (
                        "Loading..."
                    ) : (
                        `Showing ${blogs.length} of ${totalBlogs} blogs`
                    )}
                </div>
                <div className="join">
                    <button
                        className="join-item btn"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="join-item btn"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg mb-4">
                            {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                        </h3>
                        <form className="space-y-4">
                            <div>
                                <label className="label">Title</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="label">Image URL</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="label">Tags</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Separate tags with commas"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="label">Content</label>
                                <div className="space-y-4">
                                    {/* Introduction */}
                                    <div>
                                        <input type="text" className="input input-bordered w-full mb-2" placeholder="Introduction Title" />
                                        <textarea className="textarea textarea-bordered w-full" placeholder="Introduction Text" rows="3"></textarea>
                                    </div>
                                    {/* Sections */}
                                    {/* Add dynamic sections here */}
                                    <button type="button" className="btn btn-outline btn-sm">
                                        + Add Section
                                    </button>
                                </div>
                            </div>
                            <div className="modal-action">
                                <button type="button" className="btn" onClick={handleModalClose}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBlogManagement;
