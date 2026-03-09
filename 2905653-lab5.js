const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];

// whoami
app.get('/whoami', (req, res) => {
    res.status(200).json({ studentNumber: "2905653" });
});

// get all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// get book by id
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
});

// create book
app.post('/books', (req, res) => {
    const { id, title } = req.body;

    if (!id || !title) {
        return res.status(400).json({ error: "id and title are required" });
    }

    const newBook = {
        id,
        title,
        details: []
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

// update book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    const { title } = req.body;

    if (title) {
        book.title = title;
    }

    res.status(200).json(book);
});

// delete book
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    books.splice(index, 1);

    res.status(204).send();
});

// add details
app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    const { id, author, genre, publicationYear } = req.body;

    const detail = { id, author, genre, publicationYear };

    book.details.push(detail);

    res.status(201).json(detail);
});

// delete detail
app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    const index = book.details.findIndex(d => d.id === req.params.detailId);

    if (index === -1) {
        return res.status(404).json({ error: "Detail not found" });
    }

    book.details.splice(index, 1);

    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

