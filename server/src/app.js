const express = require("express"); 
const cors = require("cors");

const authRoutes = require("../src/routes/auth.routes")
const postRoutes = require("../src/routes/post.routes");

const app = express(); 
app.use(express.json()); 


app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const userRoutes = require("./routes/user.routes"); 
const authRoutes = require("../src/routes/auth.routes"); 
const contactRoutes= require("../src/routes/contact.routes")
const app = express(); 
app.use(express.json()); 
app.use("/api/users", userRoutes); 
app.use("/api/auth", authRoutes); 
app.use("/api/contact", contactRoutes); 
module.exports = app; 
 