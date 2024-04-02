const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const axios = require('axios'); // Import Axios for making HTTP requests
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/readradar', { useNewUrlParser: true, useUnifiedTopology: true });
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

// Import GraphQL schema and resolvers
const { typeDefs, resolvers } = require('../Server/schemas');
const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

// Start the server before applying middleware
(async () => {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();