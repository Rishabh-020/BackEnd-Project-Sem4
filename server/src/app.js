const express = require("express"); 
const userRoutes = require("./routes/user.routes"); 
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express(); 
app.use(express.json()); 

// app.use("/api/users", userRoutes); 
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/contacts", contactRoutes);

module.exports = app; 
 