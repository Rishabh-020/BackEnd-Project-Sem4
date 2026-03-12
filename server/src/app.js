const express = require("express"); 
const cors = require("cors");

const authRoutes = require("../src/routes/auth.routes"); 
const contactRoutes = require("../src/routes/contact.routes")
const postRoutes = require("../src/routes/post.routes")

const app = express(); 
app.use(cors());
app.use(express.json()); 

app.use("/api/contact", contactRoutes); 
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);





module.exports = app; 
 