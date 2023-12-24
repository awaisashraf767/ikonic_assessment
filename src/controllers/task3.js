const fs = require("fs");

// Develop a utility that reads a directory and lists all files with a specific extension (e.g., .txt).
//  Implement this functionality using Node.js's File System module.



const list_text_files = async (req, res) => {
    try {
        let directory_path = process.env.PWD + "/src/listDirectory/";
        let extension = ".txt";
        let files_list = [];
        fs.readdir(directory_path, (err, files) => {
            if (!err) {
                files_list = files.filter(a => a.includes(extension))
                console.log(files_list)
                return res.status(200).send({ files_list })
            }
            else {
                return res.status(400).send({ error: err.message })
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "error occured while list text files" })
    }
}

module.exports = list_text_files;