const express = require("express"); 
const cors = require("cors");

const authRoutes = require("../src/routes/auth.routes")
const postRoutes = require("../src/routes/post.routes");

const app = express(); 
app.use(express.json()); 


app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app; 
 