import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaTimes, FaCalendar, FaNewspaper } from 'react-icons/fa';
import { api } from '../../services/api';

const AdminBlogManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [blogCount, setBlogCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [editingBlog, setEditingBlog] = useState(null);
    const [allTags, setAllTags] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        tags: '',
        date: 'Just now',
        rawDate: new Date().toISOString().split('T')[0],
        readTime: '1 min read',
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
    const [saveStatus, setSaveStatus] = useState({ loading: false, error: null });

    const fetchBlogCount = async () => {
        try {
            const response = await api.get('/api/v1/blogs/count');
            setBlogCount(response.count);
        } catch (error) {
            console.error('Error fetching blog count:', error);
        }
    };

    const fetchAllTags = async () => {
        try {
            const response = await api.get('/blogs/all/tags');
            const uniqueTags = [...new Set(response.flatMap(blog => blog.tags))];
            setAllTags(uniqueTags);
        } catch (err) {
            console.error('Error fetching tags:', err);
        }
    };

    useEffect(() => {
        fetchAllTags();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await api.getBlogs(`/blogs?page=${currentPage}`);
            setBlogs(response.blogs);
            setTotalBlogs(response.totalBlogs);
            setTotalPages(response.totalPages);
            setLoading(false);
            await fetchBlogCount();
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [currentPage]);

    const formatDate = (date) => {
        const d = new Date(date);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const formattedDate = selectedDate ? formatDate(selectedDate) : 'Just now';
        setFormData({ ...formData, date: formattedDate, rawDate: selectedDate });
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            image: blog.image,
            tags: blog.tags.join(', '),
            date: blog.date || 'Just now',
            rawDate: blog.rawDate || new Date().toISOString().split('T')[0],
            readTime: blog.readTime || '1 min read',
            content: blog.content
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await api.delete(`/blogs/${blogId}`);
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
            date: 'Just now',
            rawDate: new Date().toISOString().split('T')[0],
            readTime: '1 min read',
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

    const handleAddSection = () => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                sections: [
                    ...prev.content.sections,
                    {
                        title: '',
                        text: '',
                        id: Date.now() // unique id for each section
                    }
                ]
            }
        }));
    };

    const handleRemoveSection = (sectionId) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                sections: prev.content.sections.filter(section => section.id !== sectionId)
            }
        }));
    };

    const handleSectionChange = (sectionId, field, value) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                sections: prev.content.sections.map(section =>
                    section.id === sectionId
                        ? { ...section, [field]: value }
                        : section
                )
            }
        }));
    };

    const handleIntroductionChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                introduction: {
                    ...prev.content.introduction,
                    [field]: value
                }
            }
        }));
    };

    const handleConclusionChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                conclusion: {
                    ...prev.content.conclusion,
                    [field]: value
                }
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaveStatus({ loading: true, error: null });

        try {
            // Convert comma-separated tags string to array and trim whitespace
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

            const blogData = {
                title: formData.title,
                image: formData.image,
                tags: tagsArray,
                date: formData.date,
                readTime: formData.readTime,
                content: formData.content,
                isPublished: true // Default to draft
            };

            if (editingBlog) {
                // Update existing blog
                await api.patch(`/api/v1/blogs/${editingBlog._id}`, blogData);
            } else {
                // Create new blog
                await api.post('/blogs', blogData);
            }

            // Refresh the blog list
            await fetchBlogs();

            // Close modal and reset form
            handleModalClose();

            // Show success message (you can add a toast notification here)
            alert(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!');

        } catch (error) {
            console.error('Error saving blog:', error);
            setSaveStatus({
                loading: false,
                error: error.message || 'Failed to save blog. Please try again.'
            });
        }
    };

    // Filter blogs based on search term and selected tag
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = searchTerm === '' ||
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content.introduction.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesTag = selectedTag === '' || blog.tags.includes(selectedTag);

        return matchesSearch && matchesTag;
    });

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Handle tag selection change
    const handleTagChange = (e) => {
        setSelectedTag(e.target.value);
        setCurrentPage(1); // Reset to first page when changing tag
    };

    return (
        <div className="min-h-screen p-8">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Blog Management</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn btn-primary flex items-center gap-2"
                    >
                        <FaPlus /> Create New Blog
                    </button>
                </div>
                <div className="stats shadow w-full">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <FaNewspaper className="w-8 h-8" />
                        </div>
                        <div className="stat-title">Total Blogs</div>
                        <div className="stat-value text-primary">{blogCount}</div>
                        <div className="stat-desc">
                            {loading ? "Loading..." : `${blogs.length} shown on this page`}
                        </div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title">Published Blogs</div>
                        <div className="stat-value text-secondary">
                            {blogs.filter(blog => blog.isPublished).length}
                        </div>
                        <div className="stat-desc">
                            {((blogs.filter(blog => blog.isPublished).length / blogs.length) * 100).toFixed(0)}% of total
                        </div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                        </div>
                        <div className="stat-title">Draft Blogs</div>
                        <div className="stat-value">
                            {blogs.filter(blog => !blog.isPublished).length}
                        </div>
                        <div className="stat-desc">
                            {((blogs.filter(blog => !blog.isPublished).length / blogs.length) * 100).toFixed(0)}% of total
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        className="input input-bordered w-full pr-10"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <select
                    className="select select-bordered w-48"
                    value={selectedTag}
                    onChange={handleTagChange}
                >
                    <option value="">All Tags</option>
                    {allTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
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
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs.map((blog) => (
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    <p className="text-gray-500">
                                        {searchTerm || selectedTag
                                            ? "No blogs match your search criteria"
                                            : "No blogs available"}
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                    {loading ? (
                        "Loading..."
                    ) : (
                        `Showing ${filteredBlogs.length} of ${totalBlogs} blogs`
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
                        <form onSubmit={handleSubmit} className="space-y-4">
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
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            className="input input-bordered w-full pr-10"
                                            value={formData.rawDate}
                                            onChange={handleDateChange}
                                        />
                                        <FaCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Will display as: {formData.date}
                                    </div>
                                </div>
                                <div>
                                    <label className="label">Read Time</label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={formData.readTime}
                                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                    >
                                        <option>1 min read</option>
                                        <option>2 min read</option>
                                        <option>3 min read</option>
                                        <option>5 min read</option>
                                        <option>10 min read</option>
                                        <option>15 min read</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="label">Content</label>
                                <div className="space-y-6">
                                    {/* Introduction */}
                                    <div className="bg-base-200 p-4 rounded-lg">
                                        <h4 className="font-medium mb-2">Introduction</h4>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full mb-2"
                                            placeholder="Introduction Title"
                                            value={formData.content.introduction.title}
                                            onChange={(e) => handleIntroductionChange('title', e.target.value)}
                                        />
                                        <textarea
                                            className="textarea textarea-bordered w-full"
                                            placeholder="Introduction Text"
                                            rows="3"
                                            value={formData.content.introduction.text}
                                            onChange={(e) => handleIntroductionChange('text', e.target.value)}
                                        />
                                    </div>

                                    {/* Sections */}
                                    {formData.content.sections.map((section, index) => (
                                        <div key={section.id} className="bg-base-200 p-4 rounded-lg relative">
                                            <button
                                                type="button"
                                                className="btn btn-ghost btn-sm btn-circle absolute right-2 top-2"
                                                onClick={() => handleRemoveSection(section.id)}
                                            >
                                                <FaTimes />
                                            </button>
                                            <h4 className="font-medium mb-2">Section {index + 1}</h4>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full mb-2"
                                                placeholder="Section Title"
                                                value={section.title}
                                                onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                                            />
                                            <textarea
                                                className="textarea textarea-bordered w-full"
                                                placeholder="Section Text"
                                                rows="3"
                                                value={section.text}
                                                onChange={(e) => handleSectionChange(section.id, 'text', e.target.value)}
                                            />
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className="btn btn-outline btn-sm w-full"
                                        onClick={handleAddSection}
                                    >
                                        <FaPlus className="mr-2" /> Add Section
                                    </button>

                                    {/* Conclusion */}
                                    <div className="bg-base-200 p-4 rounded-lg">
                                        <h4 className="font-medium mb-2">Conclusion</h4>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full mb-2"
                                            placeholder="Conclusion Title"
                                            value={formData.content.conclusion.title}
                                            onChange={(e) => handleConclusionChange('title', e.target.value)}
                                        />
                                        <textarea
                                            className="textarea textarea-bordered w-full"
                                            placeholder="Conclusion Text"
                                            rows="3"
                                            value={formData.content.conclusion.text}
                                            onChange={(e) => handleConclusionChange('text', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-action">
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={handleModalClose}
                                    disabled={saveStatus.loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`btn btn-primary ${saveStatus.loading ? 'loading' : ''}`}
                                    disabled={saveStatus.loading}
                                >
                                    {saveStatus.loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>

                            {saveStatus.error && (
                                <div className="text-error text-sm mt-2">
                                    {saveStatus.error}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBlogManagement;
