import express from "express";
import { body } from "express-validator";
import {
  signup,
  login,
  googleSignIn,
  getMe,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

const signupValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/google", googleSignIn);
router.get("/me", verifyToken, getMe);
router.post("/logout", verifyToken, logout);
router.put("/profile", verifyToken, updateProfile);

export default router;
