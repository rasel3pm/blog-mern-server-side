const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    author: { type: String },
    // image: [
    //   {
    //     publicID: {
    //       type: String,
    //       required: true,
    //     },
    //     url: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  { timestamps: true, versionKey: false }
);

const PostModel = mongoose.model("post", DataSchema);
module.exports = PostModel;
