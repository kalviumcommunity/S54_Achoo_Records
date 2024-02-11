const express = require("express");
const connectDb = require("./config/DbConnection");
const { connection } = require("mongoose");
const router = require("./routes/route");
const dotenv = require('dotenv').config()

const app = express()

app.use(express.json())

app.use('/api', router);

connectDb()

app.get("/",(req,res)=>{
    res.json(connectDb ? "Database Connected" : "Not Connected")    
})

app.listen(3000, (error) => {
    if (error) {
        console.error("Error starting the server:", error);
    } else {
        console.log("Server is running on localhost:3000");
    }
});

app.get("/ping",(req,res)=>{
    res.send("Ping route has been added")
})