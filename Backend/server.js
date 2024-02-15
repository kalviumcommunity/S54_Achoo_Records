const express = require("express");
const app = express()
const asyncHandler = require('express-async-handler')
const connectDb = require("./config/DbConnection");
const cors = require('cors')

const router = require("./routes/route");

const UserModel = require("./DBmodel/schema");
const { connection, default: mongoose } = require("mongoose");

const dotenv = require('dotenv').config()


app.use(express.json())
app.use(cors())

app.use('/api', router);

connectDb()

app.get("/",(req,res)=>{
    res.send(mongoose.connection.readyState === 1 ? "Database Connnected " : "Database Disonnected ")
})



app.listen(3000, (error) => {
    if (error) {
        console.error("Error starting the server:", error);
    } else {
        console.log("Server is running on localhost:3000");
    }
});

app.get("/ping",(req,res)=>{
    res.send("pong")
})