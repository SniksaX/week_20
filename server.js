const express = require('express');
require('dotenv').config();
const app = require("./app.js");


const PORT = process.env.PORT ;

app.get("/", (req, res) => {
    res.send("hello world");
})

app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`)
})