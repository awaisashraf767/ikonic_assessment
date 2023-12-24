const { Notes } = require("../models/Notes")

// Create a simple REST API endpoint using Express.js that interacts with a database (can be any database of your choice). 
// Implement CRUD operations (Create, Read, Update, Delete) for a specific resource (e.g., users, posts).


const get_notes = async (req, res) => {
    try {
        let filters = { archive: false, created_by: req.user.id }   //showing user just his own notes by fetching their id from their token.
        const all_notes = await Notes.findAll({ where: filters })
        return res.status(200).send({ data: all_notes })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "error occured while getting notes" })
    }
}

const add_note = (req, res) => {
    try {
        let note_to_create = req.body;
        if (!note_to_create.message) {
            return res.status(400).send({ error: "Please enter the message" })
        }
        else {
            note_to_create["created_by"] = req.user.id;
            note_to_create["updated_by"] = req.user.id;
            const create_note = Notes.create(note_to_create)
            console.log(create_note);
            return res.status(200).send({ msg: "added" })
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "error occured while add note" })
    }
}

const update_note = (req, res) => {
    try {
        let condition = {
            where: {
                id: req.params.noteId
            }
        }
        let payload_to_update = req.body
        payload_to_update["updated_by"] = req.user.id;
        const update_note = Notes.update(payload_to_update, condition)
        console.log(update_note)
        return res.status(200).send({ msg: "updated" })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "error occured while update note" })
    }
}

const delete_note = (req, res) => {
    try {
        let condition = {
            where: {
                id: req.params.noteId
            }
        }
        let payload_to_update = { archive: true }
        const delete_note = Notes.update(payload_to_update, condition)
        console.log(delete_note)
        return res.status(200).send({ msg: "deleted" })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "error occured while delete note" })

    }
}

module.exports = { get_notes, add_note, update_note, delete_note }