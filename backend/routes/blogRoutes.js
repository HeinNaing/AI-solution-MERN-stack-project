const express = require("express");
const { body } = require("express-validator");
//third party file
const blogController = require("../controllers/blogController");
const handleErrorMessages = require("../middlewares/handleErrorMessages");

const router = express.Router();

// Get blog count
router.get("/count", blogController.getBlogCount);

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(
    [
      body("title").notEmpty().withMessage("Title is required"),
      body("content").notEmpty().withMessage("Content is required"),
    ],
    handleErrorMessages,
    blogController.createBlog
  );
router
  .route("/:id")
  .get(blogController.getBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

// Route to get all blogs for tag extraction
router.get('/all/tags', blogController.getAllBlogsForTags);

module.exports = router;
