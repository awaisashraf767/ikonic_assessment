const express = require("express");
const router = express.Router();
const { get_notes,add_note,update_note,delete_note } = require("../controllers/task4")


router.get("/read/notes", get_notes)
router.post("/write/note", add_note)
router.put("/update/note/:noteId", update_note)
router.delete("/delete/note/:noteId", delete_note)


module.exports = router