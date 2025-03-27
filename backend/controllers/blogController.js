const Blog = require("../models/Blog");
let mongoose = require("mongoose");
const blogController = {
  index: (req, res) => {
    res.json({ message: "Hello World" });
  },
  getAllBlogs: async (req, res) => {
    let blog = await Blog.find().sort({ createdAt: -1 });

    return res.json(blog);
  },
  getBlog: async (req, res) => {
    try {
      let id = req.params.id;
      //checking valid id
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }
      //finding blog
      let blog = await Blog.findById(id);
      //checking if blog exists
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      return res.json(blog);
    } catch (e) {
      res.status(500).json({ message: "Internet server error" });
    }
  },
  createBlog: async (req, res) => {
    try {
      const { title, content, author } = req.body;
      const blog = await Blog.create({
        title,
        content,
        author,
      });
      return res.json(blog);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateBlog: async (req, res) => {
    try {
      const { id } = req.params;
      //checking valid id
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }
      const { title, content, author } = req.body;

      const blog = await Blog.findByIdAndUpdate(
        id,
        { title, content, author },
        { new: true, runValidators: true }
      );

      if (!blog) {
        return res.status(404).json({ message: "blog not found" });
      }

      return res.json(blog);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;
      //checking valid id
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }
      //finding and deleting blog
      const blog = await Blog.findByIdAndDelete(id);
      //checking if blog exists
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      return res.json({ message: "Blog deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = blogController;
