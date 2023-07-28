const mongoose = require("mongoose");

const { Schema } = mongoose;

const certificateSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  url: {
    type: String,
    required: true,
  },
  image_id: {
    type: String,
  },
});

const certificate = mongoose.model("Certificate", certificateSchema);

module.exports = certificate;

// const shipSchema = new Schema({
//   name: {
//     String,
//     required: true,
//   },
// });
