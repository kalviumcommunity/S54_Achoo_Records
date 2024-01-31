const express = require("express")

const app = express()

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

