import { useState } from 'react';
import { api } from '../services/api';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    companyName: '',
    jobTitle: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/contacts', formData);
      console.log('Contact created:', response);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message. We will contact you soon!'
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        companyName: '',
        jobTitle: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit form. Please try again.'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-primary mb-8">Contact Us</h1>
      
      {submitStatus.message && (
        <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-error'} mb-8`}>
          {submitStatus.message}
        </div>
      )}

      {/* Contact Info Cards */}
      <div className="bg-primary text-primary-content p-8 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone */}
          <div className="flex items-center gap-4">
            <div className="bg-base-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <div className="font-medium">Phone:</div>
              <div>+95912345678</div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="bg-base-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="font-medium">Email:</div>
              <div>info@example.com</div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-4">
            <div className="bg-base-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="font-medium">Address:</div>
              <div>Lorem ipsum dolor sit amet</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Phone */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Country */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select</option>
                <option value="myanmar">Myanmar</option>
                <option value="thailand">Thailand</option>
                <option value="singapore">Singapore</option>
              </select>
            </div>

            {/* Company Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Job Title */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Job Title</span>
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Job Title"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* Job Detail */}
          <div className="form-control w-full col-span-2">
            <label className="label">
              <span className="label-text">Job Detail</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your job details here..."
              className="textarea textarea-bordered min-h-[200px] w-full"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
