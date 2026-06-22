const express = require('express');

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
})

app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`)
})