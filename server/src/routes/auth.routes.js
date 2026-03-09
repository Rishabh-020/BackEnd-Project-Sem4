import express from "express";
import { signup, signin, getAllUsers } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);    // POST /signup → signup()
router.post("/signin", signin);    // POST /signin → signin()
router.get("/users", getAllUsers);  // GET  /users  → getAllUsers()

export default router;