import express from "express";
import { sendContactEmail } from "../controllers/contact.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/contact
 * @desc    Send a contact email
 * @access  Private (Logged in users only)
 */
router.post("/", verifyToken, sendContactEmail);

export default router;
