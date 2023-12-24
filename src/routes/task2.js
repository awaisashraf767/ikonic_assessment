const express=require("express");
const router=express.Router();
const error_handling=require("../controllers/task2")
router.get("/",error_handling)

module.exports = router