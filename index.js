const express=require("express");
const app=express();
const PORT = 3000
const {connectDB}=require("./src/scripts/db_connection");

connectDB();
app.listen(PORT,()=>{
    console.log(`App is running at port ${PORT}`)
})