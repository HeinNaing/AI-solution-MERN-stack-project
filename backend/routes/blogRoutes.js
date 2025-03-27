const express = require("express");
const { body } = require("express-validator");
//third party file
const blogController = require("../controllers/blogController");
const handleErrorMessages = require("../middlewares/handleErrorMessages");

const router = express.Router();
router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(
    [
      body("title").notEmpty().withMessage("Title is required"),
      body("content").notEmpty().withMessage("Content is required"),
      body("author").notEmpty().withMessage("Author is required"),
    ],
    handleErrorMessages,
    blogController.createBlog
  );
router
  .route("/:id")
  .get(blogController.getBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
