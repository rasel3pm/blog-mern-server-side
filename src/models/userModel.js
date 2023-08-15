const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserModel = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 4,
      max: 20,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true, versionKey: false }
);
const User = mongoose.model("User", UserModel);
module.exports = User;
