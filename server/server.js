import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth1.routes.js";  // ← ADD THIS

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

app.use("/api/auth", authRoutes);  // ← ADD THIS

app.listen(5000, () => console.log("Server running on 5000"));