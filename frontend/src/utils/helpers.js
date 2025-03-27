// Helper functions

/**
 * Format date to readable string
 * @param {Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Truncate text to specified length
 * @param {string} text
 * @param {number} length
 * @returns {string}
 */
export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};
