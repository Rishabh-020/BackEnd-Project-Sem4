const express=require('express')
const { signup, signin, getAllUsers, updateUser, deleteUser } = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/signup", signup);       // POST   /signup     → signup()
router.post("/signin", signin);       // POST   /signin     → signin()
router.get("/users", getAllUsers);     // GET    /users      → getAllUsers()
router.put("/users/:id", updateUser);    // PUT    /users/:id  → updateUser()
router.delete("/users/:id", deleteUser); // DELETE /users/:id  → deleteUser()

module.exports = router;