const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.createAccount = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //find user with email
    const exsistUser = await User.findOne({ email: email });
    if (exsistUser) {
      throw Error("Already have an account");
    }
    //encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    req.body.password = hash;

    const addUser = await new User({
      name,
      email,
      role,
      password: hash,
    });
    const user = await addUser.save();
    res.status(200).json({ message: "Account create success", user });
  } catch (err) {
    res.status(400).json({ error: "Something went wrong", err });
  }
};

exports.allUser = async (req, res) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    if (user) {
      res.status(202).json({ message: "Success get task", user });
    }
  } catch (err) {
    res.status(404).json({ error: "Failed to get all task" });
  }
};

exports.loginAccount = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email: email });
    if (user && user.length > 0) {
      const validPassword = await bcrypt.compare(password, user[0].password);
      if (validPassword) {
        const token = jwt.sign(
          {
            name: user[0].name,
            email: user[0].email,
            userId: user[0]._id,
            role: user[0].role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res
          .cookie("access_token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
          })
          .json({ message: "Login Success", access_token: token });
      } else {
        res.status(401).json({ message: "wrong email or password" });
      }
    } else {
      res.status(401).json({ message: "wrong email or password" });
    }
  } catch (err) {
    res.status(401).json({ message: "wrong email or password--" });
  }
};
