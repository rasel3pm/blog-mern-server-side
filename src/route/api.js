const {
  CreatePost,
  ReadPost,
  ReadPostById,
  UpdatePost,
  DeletePost,
} = require("../controller/PostController");
// const upload = require("../helper/multerConfig")
const router = require("express").Router();

router.post("/create", CreatePost);
router.get("/read", ReadPost);
router.get("/post/:id", ReadPostById);
router.post("/update/:id", UpdatePost);
router.delete("/delete/:id", DeletePost);

module.exports = router;
