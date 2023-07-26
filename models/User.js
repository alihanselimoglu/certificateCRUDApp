const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator"); 

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true,
      lowercase: true,
      validate: [validator.isAlphanumeric, "Please enter a valid username"], 
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [4, "Minimum password length is 4 characters"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this
  console.log('user pass 1', user.password )
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash,
  console.log('user pass 2', user.password )
    next()
  })
});

const user = mongoose.model("User", userSchema);

module.exports = user;
