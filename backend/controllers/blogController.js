const BlogPost = require("../models/BlogPost");
let mongoose = require("mongoose");

const blogController = {
  index: (req, res) => {
    res.json({ message: "Hello World" });
  },

  getAllBlogs: async (req, res) => {
    try {
      const { page = 1, limit = 9, tag } = req.query;
      const query = tag ? { tags: tag } : {};

      const blogs = await BlogPost.find(query)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const count = await BlogPost.countDocuments(query);

      return res.json({
        blogs,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        totalBlogs: count,
        currentPageBlogs: blogs.length
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getBlog: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      let blog = await BlogPost.findById(id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      return res.json(blog);
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  createBlog: async (req, res) => {
    try {
      const {
        title,
        image,
        tags,
        content,
        author
      } = req.body;

      // Calculate read time (assuming 200 words per minute)
      const wordCount = content.introduction.text.split(' ').length +
        content.sections.reduce((acc, section) => acc + section.text.split(' ').length, 0) +
        content.conclusion.text.split(' ').length;
      const readTime = `${Math.ceil(wordCount / 200)} min read`;

      const blog = await BlogPost.create({
        title,
        date: 'Just now',
        readTime,
        image,
        tags,
        content,
        author
      });

      return res.status(201).json(blog);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateBlog: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      const {
        title,
        image,
        tags,
        content,
        author,
        isPublished
      } = req.body;

      // Calculate new read time if content is updated
      let updateData = { ...req.body };
      if (content) {
        const wordCount = content.introduction.text.split(' ').length +
          content.sections.reduce((acc, section) => acc + section.text.split(' ').length, 0) +
          content.conclusion.text.split(' ').length;
        updateData.readTime = `${Math.ceil(wordCount / 200)} min read`;
      }

      const blog = await BlogPost.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      return res.json(blog);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      const blog = await BlogPost.findByIdAndDelete(id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      return res.json({ message: "Blog deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getRecentBlogs: async (req, res) => {
    try {
      const recentBlogs = await BlogPost.find({ isPublished: true })
        .sort({ createdAt: -1 })
        .limit(3);

      return res.json(recentBlogs);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

module.exports = blogController;
