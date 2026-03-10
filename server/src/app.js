const express = require("express"); 
const cors = require("cors");
const app = express(); 

const postRoutes = require("../src/routes/post.routes");
const authRoutes = require("../src/routes/auth.routes"); 
const contactRoutes= require("../src/routes/contact.routes")

app.use(express.json()); 

app.use(express.json()); 

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/contact", contactRoutes); 

module.exports = app; 
 