const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Certificate = require("../models/Certificate.js");

const User = require("../models/User.js");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {


    let errors2 = {}

    if (error.name === 'ValidationError') {
      Object.keys(error.errors).forEach((key) => {
          errors2[key] = error.errors[key].message
        })
    }



    res.status(400).json({errors2});
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
    } else {
      return res.status(401).json({
        succeded: false,
        error: "There is no such a user",
      });
    }

    if (same) {
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

      res.redirect("/users/dashboard");
    } else {
      res.status(401).json({
        succeded: false,
        error: "passwords are not match",
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const getDashboardPage = async (req, res) => {
  const certificates = await Certificate.find({user:res.locals.user._id});
  res.render("dashboard", { certificates});
  
  link: "dashboard";
};

module.exports = { createUser, loginUser, getDashboardPage };
