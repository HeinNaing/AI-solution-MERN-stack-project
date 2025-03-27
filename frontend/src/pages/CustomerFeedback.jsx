import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { FaStar, FaUserCircle } from 'react-icons/fa';

const CustomerFeedback = () => {
    // State for feedback form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 5,
        message: '',
        company: '',
        position: '',
        allowPublish: true
    });

    // State for testimonials
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
    const [filter, setFilter] = useState('all'); // all, 5, 4, 3, 2, 1

    // Fetch testimonials (using dummy data for now)
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const dummyTestimonials = [
                {
                    id: 1,
                    name: 'John Smith',
                    company: 'ABC Corp',
                    position: 'CTO',
                    rating: 5,
                    message: 'AI Solution has transformed our business operations. Their AI-powered tools have improved efficiency by 40% and reduced errors significantly.',
                    date: '2023-11-15'
                },
                {
                    id: 2,
                    name: 'Sarah Johnson',
                    company: 'XYZ Industries',
                    position: 'Product Manager',
                    rating: 4,
                    message: 'Great solutions that integrated well with our existing systems. Would recommend for mid-size businesses looking to streamline operations.',
                    date: '2023-10-22'
                },
                {
                    id: 3,
                    name: 'Michael Wong',
                    company: 'Tech Innovators',
                    position: 'CEO',
                    rating: 5,
                    message: 'The customer service is exceptional. Their team was always available to answer questions and help with implementation.',
                    date: '2023-12-05'
                },
                {
                    id: 4,
                    name: 'Emily Chen',
                    company: 'Data Analytics Co',
                    position: 'Data Scientist',
                    rating: 4,
                    message: 'The AI models provided accurate predictions and insights. Some features could use more customization options.',
                    date: '2023-09-18'
                },
                {
                    id: 5,
                    name: 'Ahmed Hassan',
                    company: 'Global Solutions',
                    position: 'Operations Director',
                    rating: 5,
                    message: 'Implementing AI Solution\'s products has been a game-changer for our global operations. Highly recommend!',
                    date: '2024-01-10'
                },
                {
                    id: 6,
                    name: 'Lisa Müller',
                    company: 'European Tech',
                    position: 'IT Manager',
                    rating: 3,
                    message: 'Good product with some implementation challenges. Support team was helpful in resolving issues.',
                    date: '2023-11-02'
                }
            ];
            setTestimonials(dummyTestimonials);
            setLoading(false);
        }, 1000);
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle rating selection
    const handleRatingChange = (rating) => {
        setFormData(prevState => ({
            ...prevState,
            rating
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus({ type: 'loading', message: 'Submitting your feedback...' });
        
        // Simulate API call
        setTimeout(() => {
            setSubmitStatus({ 
                type: 'success', 
                message: 'Thank you for your feedback! Once approved, it will be displayed on our site.' 
            });
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                rating: 5,
                message: '',
                company: '',
                position: '',
                allowPublish: true
            });
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                setSubmitStatus({ type: '', message: '' });
            }, 5000);
        }, 1500);
    };

    // Filter testimonials based on rating
    const filteredTestimonials = filter === 'all' 
        ? testimonials 
        : testimonials.filter(t => t.rating === parseInt(filter));

    // Render stars for rating
    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, i) => (
            <FaStar 
                key={i} 
                className={i < rating ? 'text-yellow-500' : 'text-gray-300'} 
            />
        ));
    };
    
    return (
        <div className="container mx-auto px-4 py-16">
            {/* Hero section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Customer Feedback</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We value what our customers have to say. Read testimonials from businesses 
                    that have partnered with us and share your own experience.
                </p>
            </div>
            
            {/* Testimonials section */}
            <div className="mb-20">
                <div className="flex flex-wrap justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Client Testimonials</h2>
                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                        <span className="text-gray-600">Filter by rating:</span>
                        <select 
                            value={filter} 
                            onChange={(e) => setFilter(e.target.value)}
                            className="select select-bordered select-sm"
                        >
                            <option value="all">All Ratings</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>
                </div>
                
                {loading ? (
                    <div className="flex justify-center py-12">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : filteredTestimonials.length === 0 ? (
                    <div className="text-center py-12 bg-base-200 rounded-lg">
                        <p className="text-gray-500">No testimonials found with this rating.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTestimonials.map(testimonial => (
                            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 transition-transform hover:shadow-xl hover:-translate-y-1">
                                <div className="flex gap-1 mb-3">
                                    {renderStars(testimonial.rating)}
                                </div>
                                <p className="text-gray-700 mb-6 min-h-[100px]">"{testimonial.message}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</p>
                                        <p className="text-xs text-gray-500">{new Date(testimonial.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Feedback submission form */}
            <div className="bg-base-100 rounded-xl shadow-lg p-8 border border-gray-100 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Share Your Experience</h2>
                
                {submitStatus.message && (
                    <div className={`alert ${
                        submitStatus.type === 'success' ? 'alert-success' : 
                        submitStatus.type === 'error' ? 'alert-error' : 'alert-info'
                    } mb-6`}>
                        <div>
                            {submitStatus.type === 'loading' && <span className="loading loading-spinner"></span>}
                            <span>{submitStatus.message}</span>
                        </div>
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        
                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        
                        {/* Company */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Company</span>
                            </label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Your Company"
                                required
                            />
                        </div>
                        
                        {/* Position */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Position</span>
                            </label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Your Position"
                                required
                            />
                        </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text">Your Rating</span>
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleRatingChange(star)}
                                    className="text-2xl focus:outline-none"
                                >
                                    <FaStar 
                                        className={star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'} 
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Message */}
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text">Your Feedback</span>
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="textarea textarea-bordered h-32"
                            placeholder="Please share your experience with our services..."
                            required
                        ></textarea>
                    </div>
                    
                    {/* Allow publishing */}
                    <div className="form-control mb-8">
                        <label className="label cursor-pointer justify-start gap-3">
                            <input
                                type="checkbox"
                                name="allowPublish"
                                checked={formData.allowPublish}
                                onChange={handleChange}
                                className="checkbox checkbox-primary"
                            />
                            <span className="label-text">I allow AI Solution to publish my feedback on their website</span>
                        </label>
                    </div>
                    
                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={submitStatus.type === 'loading'}
                    >
                        {submitStatus.type === 'loading' ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Submitting...
                            </>
                        ) : 'Submit Feedback'}
                    </button>
                </form>
            </div>
            
            {/* Stats section */}
            <div className="my-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-base-100 p-8 rounded-lg shadow border border-gray-100">
                        <div className="text-4xl font-bold text-primary mb-2">96%</div>
                        <div className="text-gray-600">Customer Satisfaction</div>
                    </div>
                    <div className="bg-base-100 p-8 rounded-lg shadow border border-gray-100">
                        <div className="text-4xl font-bold text-primary mb-2">500+</div>
                        <div className="text-gray-600">Business Partners</div>
                    </div>
                    <div className="bg-base-100 p-8 rounded-lg shadow border border-gray-100">
                        <div className="text-4xl font-bold text-primary mb-2">4.8/5</div>
                        <div className="text-gray-600">Average Rating</div>
                    </div>
                </div>
            </div>
            
            {/* FAQ */}
            <div className="max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                <div className="join join-vertical w-full">
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="faq-accordion" defaultChecked /> 
                        <div className="collapse-title text-lg font-medium">
                            How does AI Solution ensure customer satisfaction?
                        </div>
                        <div className="collapse-content"> 
                            <p>We take a client-centered approach to every project, maintaining open communication channels and regular check-ins. Our success metrics are tied directly to your business outcomes, and we provide ongoing support after implementation.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="faq-accordion" /> 
                        <div className="collapse-title text-lg font-medium">
                            How quickly can I expect results after implementing your solutions?
                        </div>
                        <div className="collapse-content"> 
                            <p>Most clients see initial improvements within the first month of implementation. Full optimization usually occurs within 3-6 months as our AI systems learn and adapt to your specific business processes and data.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="faq-accordion" /> 
                        <div className="collapse-title text-lg font-medium">
                            How do you handle customer feedback?
                        </div>
                        <div className="collapse-content"> 
                            <p>We review all customer feedback thoroughly and use it to improve our products and services. Our development roadmap is heavily influenced by client suggestions and needs, making your input invaluable to our progress.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerFeedback;
