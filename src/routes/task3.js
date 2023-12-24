const express=require("express");
const router=express.Router();
const list_text_files=require("../controllers/task3")


router.get("/",list_text_files)

module.exports = router