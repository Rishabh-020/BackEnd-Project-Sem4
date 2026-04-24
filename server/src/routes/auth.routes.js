const express=require('express')
const { signup, signin, getAllUsers, updateUser, deleteUser, uploadProfilePicture, getProfilePicture, deleteProfilePicture } = require("../controllers/auth.controller.js");
const upload = require("../middleware/upload.js");

const router = express.Router();

router.post("/signup", signup);       // POST   /signup     → signup()
router.post("/signin", signin);       // POST   /signin     → signin()
router.get("/users", getAllUsers);     // GET    /users      → getAllUsers()
router.put("/users/:id", updateUser);    // PUT    /users/:id  → updateUser()
router.delete("/users/:id", deleteUser); // DELETE /users/:id  → deleteUser()

// Profile picture routes
router.post("/users/:id/profile-picture", upload.single("profilePicture"), uploadProfilePicture); // POST /users/:id/profile-picture → uploadProfilePicture()
router.get("/users/:id/profile-picture", getProfilePicture); // GET /users/:id/profile-picture → getProfilePicture()
router.delete("/users/:id/profile-picture", deleteProfilePicture); // DELETE /users/:id/profile-picture → deleteProfilePicture()

module.exports = router;