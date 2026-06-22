const express = require('express');
const env = require('dotenv');
require('dotenv').config();

const PORT = process.env.PORT ;
const app = express();

app.get("/", (req, res) => {
    res.send("hello world");
})

app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`)
})