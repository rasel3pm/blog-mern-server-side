const PostModel = require("../models/postModel");
const cloudinary = require("../helper/cloudinaryConfig");

//create post
exports.CreatePost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    // cloudinary image hosting connect
    // let imageCloud = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "postImage",
    // });
    const post = await new PostModel({
      title,
      content,
      author,
      // image: {
      //   publicID: imageCloud.public_id,
      //   url: imageCloud.secure_url,
      // },
    });
    await post.save();
    res.status(200).json({ status: "Post create success", post });
  } catch (error) {
    res.status(400).json({ status: "fail to create post", error });
  }
};

//read post
exports.ReadPost = async (req, res) => {
  try {
    //   let Query = {};
    //   let projection = "ProductName ProductPrice Img UnitPrice Qty TotalPrice";
    const post = await PostModel.find({}).sort({ createdAt: -1 });
    if (post) {
      res.status(200).json({ message: "Success get psot", post });
    }
  } catch (err) {
    res.status(404).json({ error: "Failed to get psot" });
  }
};

//get product by id
exports.ReadPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById({ _id: postId });
    if (post) {
      res.status(200).json({ message: "get success by id", post });
    }
  } catch (err) {
    console.log(err);
  }
};

//update post
exports.UpdatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatePost = await PostModel.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    res.json(updatePost);
  } catch (error) {
    res.status(500).json({ error: "fail to update post" });
  }
};

//delete post
exports.DeletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findByIdAndDelete({ _id: postId });
    res.status(200).json({ message: "Success delete post", post });
  } catch (err) {
    res.status(200).json({ message: "psot not delete" });
  }
};
