const express=require("express");
const router=express.Router();
const downlaod_content=require("../controllers/task1")
router.post("/",downlaod_content)

module.exports = router