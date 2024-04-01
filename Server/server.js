const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define mongoose schema and model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String
});
const Book = mongoose.model('Book', bookSchema);

// GraphQL schema
const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: String!
    genre: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!, genre: String!): Book
    updateBook(id: ID!, title: String, author: String, genre: String): Book
    deleteBook(id: ID!): Boolean
  }
`);

// Root resolver
const root = {
  books: async () => await Book.find(),
  book: async ({ id }) => await Book.findById(id),
  addBook: async ({ title, author, genre }) => {
    const book = new Book({ title, author, genre });
    return await book.save();
  },
  updateBook: async ({ id, title, author, genre }) => {
    await Book.findByIdAndUpdate(id, { title, author, genre });
    return await Book.findById(id);
  },
  deleteBook: async ({ id }) => {
    await Book.findByIdAndDelete(id);
    return true;
  }
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));