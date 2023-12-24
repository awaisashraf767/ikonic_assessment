const express = require("express");
const app = express();
const PORT = 3000
const cors = require("cors");
const { connectDB } = require("./src/scripts/db_connection");
const downlaodContentRoute = require("./src/routes/task1");
const errorHandlingRoute=require("./src/routes/task2")
const listTextFilesRoute = require("./src/routes/task3");
const notesRoute = require("./src/routes/task4");
const userRoute = require("./src/routes/task5");
const { authenticate_token } = require("./src/middlewares/auth")
connectDB();

app.use(express.json({ limit: '100mb' }));
app.use(express.text())
app.use(cors());


app.use(function (req, res, next) {
    console.debug(`Request Method: ${req.method}, Request Url: ${req.url}, IP: ${req.ip},  Request Body: ${JSON.stringify(req.body)}, Request Params: ${JSON.stringify(req.params)}, Request Query: ${JSON.stringify(req.query)}, |  `)
    next()
})

app.use("/api/downlaod_content", downlaodContentRoute)
app.use("/api/error_handle",errorHandlingRoute)
app.use("/api/list_text_files", listTextFilesRoute)
app.use("/api/auth/", userRoute)
app.use("/api/", authenticate_token, notesRoute)



app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})