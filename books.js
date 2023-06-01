const express = require('express');
const router = express.Router();
const Book = require('./Book');

// GET /books: Retrieve all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
});

// GET /books/:id: Retrieve a specific book by ID
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve the book' });
  }
});

// POST /books: Create a new book
router.post('/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create the book' });
  }
});

// PUT /books/:id: Update a book by ID
router.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update the book' });
  }
});

// DELETE /books/:id: Delete a book by ID
router.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete the book' });
  }
});

module.exports = router;
