import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Please add some content"],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=80",
    },
    shortDescription: {
      type: String,
      required: [true, "Please add a short description"],
      maxlength: [200, "Description cannot be more than 200 characters"],
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    category: {
      type: String,
      required: [true, "Please specify a category"],
      enum: [
        "Adventure",
        "Culture",
        "Food",
        "Nature",
        "Guides",
        "Wildlife",
        "Backpacking",
        "Luxury",
        "Solo Travel",
        "Road Trips",
        "Photography",
        "Other",
      ],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Post", postSchema);
