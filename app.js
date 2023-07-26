const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload")
const cloudinary = require("cloudinary").v2

const conn = require("./db.js");
const pageRoute = require("./routes/pageRoute.js");
const certificateRoute = require("./routes/certificateRoute.js");
const userRoute = require("./routes/userRoute.js");
const { checkUser } = require("./middlewares/authMiddleware.js");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET
})

// connection to do db
conn();

const app = express();

// ejs template engine
app.set("view engine", "ejs");

// static files middleware
app.use(express.static("public"));
// for reading requests as json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileupload({useTempFiles: true}));

//routes
app.use("*", checkUser); 
app.use("/", pageRoute);
app.use("/certificates", certificateRoute);
app.use("/users", userRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Application running on ${port}`);
});
