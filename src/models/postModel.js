const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const PostModel = mongoose.model("post", DataSchema);
module.exports = PostModel;
