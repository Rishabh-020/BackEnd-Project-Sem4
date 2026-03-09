const express=require('express')
const cors =require("cors");
const dotenv = require( "dotenv");
const authRoutes =require( "./src/routes/auth.routes.js") // ← ADD THIS

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

app.use("/api/auth", authRoutes);  // ← ADD THIS

app.listen(5000, () => console.log("Server running on 5000"));