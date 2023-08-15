const {
  CreatePost,
  ReadPost,
  ReadPostById,
  UpdatePost,
  DeletePost,
} = require("../controller/PostController");
const {
  createAccount,
  loginAccount,
  allUser,
} = require("../controller/userController");
const router = require("express").Router();

//blog routing endpoint
router.post("/create", CreatePost);
router.get("/read", ReadPost);
router.get("/post/:id", ReadPostById);
router.post("/update/:id", UpdatePost);
router.delete("/delete/:id", DeletePost);

//user Route Endpoint
router.post("/register", createAccount);
router.post("/login", loginAccount);
router.get("/user", allUser);

module.exports = router;
