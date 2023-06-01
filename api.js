const express = require('express');
const mongoose = require('mongoose');
const booksRouter = require('./books');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/book_management', {
  useNewUrlParser}
