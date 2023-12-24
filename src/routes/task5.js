const express = require("express");
const router = express.Router();
const { register_user,login_user } = require("../controllers/task5")


router.post("/register", register_user)
router.post("/login", login_user)



module.exports = router