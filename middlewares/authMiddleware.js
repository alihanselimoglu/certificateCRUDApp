const jwt = require("jsonwebtoken");

const User = require("../models/User.js");

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.userId);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const authendicateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err) => {
        if (err) {
          res.redirect("/login");
          res.status(401).json({
            succeeded: false,
            error: "Not authorized",
          });
        } else {
          next();
        }
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.status(401).json({
      succeeded: false,
      error: "Not authorized",
    });
  }
};

module.exports = { authendicateToken, checkUser };
