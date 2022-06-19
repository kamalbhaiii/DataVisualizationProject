const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const findRoute = require('./routes/finds')
const port = process.env.PORT || 5000;
const db_uri = process.env.DBURI;

const app = express()

app.use(cors());
app.use(express.json());

mongoose.connect(db_uri);
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Connection with database established successfully.");
});

app.use('/finds', findRoute)

if(process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend','build','index.html'))
    })
}

app.listen(port, ()=>{
    console.log(`Server is live on http://localhost:${port}`);
});