const express=require('express')
const { signup, signin, getAllUsers } = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/signup", signup);    // POST /signup → signup()
router.post("/signin", signin);    // POST /signin → signin()
router.get("/users", getAllUsers);  // GET  /users  → getAllUsers()

module.exports = router;