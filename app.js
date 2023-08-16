const express = require("express");
const router = require("./src/route/api");
const connectDB = require("./src/database/DBConnect");
const app = new express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

//Security Middleware
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
//Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
//Body perser
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://serversideblog.vercel.app",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://serversideblog.vercel.app"); // Replace with your frontend domain
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
//mongodb Connection
connectDB();

//Rate Limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 100, max: 3000 });
app.use(limiter);
//Database
// Managing BackEnd API Routing
app.use("/api/v1", router);
app.use("*", (req, res) => {
  res.status(404).json({ status: "Page not found,Please check Url" });
});
module.exports = app;
