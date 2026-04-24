const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: null
    },
    author: {
      type: String,
      required: true
    },
    likes: [
      {
        type: String
      }
    ],
    shares: {
      type: Number,
      default: 0
    },
    savedBy: [
      {
        type: String
      }
    ],
    comments: [commentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
