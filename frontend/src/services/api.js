const API_BASE_URL = import.meta.env.VITE_API_URL ;
import axios from "axios";

/**
 * API service for making HTTP requests
 */
export const api = {
  /**
   * Get all blogs
   * @returns {Promise}
   */
  getBlogs: async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/blogs`);
    return response.json();
  },

  /**
   * Get single blog by id
   * @param {string} id
   * @returns {Promise}
   */
  getBlogById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/blogs/${id}`);
    return response.json();
  },

  /**
   * Create new blog
   * @param {Object} data
   * @returns {Promise}
   */
  createBlog: async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  /**
   * Get all contacts
   * @returns {Promise}
   */
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1${endpoint}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  /**
   * Create new contact
   * @param {Object} data
   * @returns {Promise}
   */
  // post: async (endpoint, data) => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     if (!response.ok) {
  //       const error = await response.json();
  //       throw new Error(
  //         error.message || `HTTP error! status: ${response.status}`
  //       );
  //     }
  //     return response.json();
  //   } catch (error) {
  //     console.error("API Error:", error);
  //     throw error;
  //   }
  // },
  post: async (endpoint, data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1${endpoint}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // If authentication is needed (optional)
      });

      return response.data; // Axios automatically parses JSON
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  },
  put: async (endpoint, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}${endpoint}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // If authentication is needed (optional)
      });

      return response.data; // Axios automatically parses JSON
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  },

  patch: async (endpoint, data) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}${endpoint}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // If authentication is needed (optional)
      });

      return response.data; // Axios automatically parses JSON
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Delete contact
   * @param {string} endpoint
   * @returns {Promise}
   */
  delete: async (endpoint) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/v1${endpoint}`, {
        withCredentials: true, // If you need cookies/authentication
      });

      return response.data; // Axios automatically parses JSON
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  },

  login: async (endpoint, data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1${endpoint}`, data, { withCredentials: true })
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  getContacts: async (endpoint) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1${endpoint}`, { withCredentials: true })
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  getBlogs: async (endpoint) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1${endpoint}`, { withCredentials: true })
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  logout: async (endpoint) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1${endpoint}`, {}, { withCredentials: true })
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
};
