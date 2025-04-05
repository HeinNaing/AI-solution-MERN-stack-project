import React, { useState } from 'react';
import { api } from '../services/api';

const EmailModal = ({ isOpen, onClose, onEmailSent, recipientEmail, recipientName, contactId }) => {
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [sending, setSending] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.subject.trim() || !formData.message.trim()) {
            setStatus({
                type: 'error',
                message: 'Please fill in all fields'
            });
            return;
        }

        setSending(true);
        setStatus({ type: '', message: '' });

        try {
            // Send email
            const emailResponse = await api.post('/contacts/send-email/send', {
                to: recipientEmail,
                subject: formData.subject.trim(),
                message: formData.message.trim()
            });

            if (emailResponse.success) {
                // Update status
                try {
                    await api.put(`/contacts/${contactId}/status`, {
                        status: "completed"
                    });
                } catch (statusError) {
                    console.error('Error updating status:', statusError);
                }

                setStatus({
                    type: 'success',
                    message: 'Email sent successfully!'
                });

                // Call onEmailSent callback with success
                if (onEmailSent) {
                    onEmailSent(true);
                }

                setTimeout(() => {
                    onClose();
                    setFormData({ subject: '', message: '' });
                }, 2000);
            } else {
                throw new Error(emailResponse.message || 'Failed to send email');
            }
        } catch (error) {
            console.error('Email error:', error);
            setStatus({
                type: 'error',
                message: error.response?.data?.message || error.message || 'Failed to send email'
            });
            // Call onEmailSent callback with failure
            if (onEmailSent) {
                onEmailSent(false);
            }
        } finally {
            setSending(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Send Email to {recipientName}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            To:
                        </label>
                        <input
                            type="email"
                            value={recipientEmail}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subject:
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="Enter email subject"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message:
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="6"
                            placeholder="Enter your message here"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        ></textarea>
                    </div>

                    {status.message && (
                        <div
                            className={`p-3 rounded ${status.type === 'success'
                                ? 'bg-green-100 text-green-700 border border-green-400'
                                : 'bg-red-100 text-red-700 border border-red-400'
                                }`}
                        >
                            {status.message}
                        </div>
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                            disabled={sending}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            disabled={sending}
                        >
                            {sending ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </span>
                            ) : 'Send Email'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmailModal; 