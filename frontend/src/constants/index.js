// Navigation
export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/blog', label: 'Blog' },
  { path: '/about-us', label: 'About Us' },
  { path: '/contact-us', label: 'Contact Us' },
  { path: '/admin/contacts', label: 'Admin Dashboard', admin: true }
];

// API Status
export const API_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Blog categories
export const BLOG_CATEGORIES = [
  'AI Solutions',
  'Machine Learning',
  'Deep Learning',
  'Neural Networks',
  'Computer Vision',
  'Natural Language Processing'
];

// Pagination
export const ITEMS_PER_PAGE = 10;

// Theme colors
export const COLORS = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8'
};
