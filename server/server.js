const app = require("./src/app");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./src/routes/auth.routes.js");
const contactRoutes = require("./src/routes/contact.routes.js"); // ✅ FIXED

dotenv.config();

app.use(cors());
app.use(express.json());

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

app.listen(5000, () => console.log("Server running on 5000"));
const app = require("./src/app");

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
