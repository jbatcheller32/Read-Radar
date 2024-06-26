const { Schema, model } = require('mongoose');

// Define Comment Schema
const commentSchema = new Schema({
  content: String,
});

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved book id from Open Library
  bookId: {
    type: String,
    required: true
  },

  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
comments: [commentSchema],
});

module.exports = bookSchema;
