const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Your routes here

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

let books = [];