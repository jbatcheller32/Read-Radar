Dans-Branch
const { User, Book } = require('../models');

const { default: mongoose } = require("mongoose");
const { User, Book } = require("../models");
const { signToken, AuthenticationError } = require("../utils/Auth");
main

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("savedBooks");
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: book } },
          { new: true }
        );
        return user;
      }
      throw AuthenticationError;
    },

    addComment: async (parent, { book, username, comment }, context) => {
      if (context.user) {
        const { _id: userId, username } = context.user;
        const newComment = content ? { content: content } : null;

        const updatedBook = await Book.findByIdAndUpdate(
          bookId,
          { $push: { comments: { content: content } } },
          { new: true }
        );

        // Check if the user exists
        if (!updatedBook) {
          throw new Error("No bookl with this id or book not found!");
        }

        return updatedBook; // Return the updated user object
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookId } }, // target the _id field of the books

          { new: true }
        ).populate("savedBooks");

        if (!updatedUser) {
          throw new Error("No user with this id!");
        }

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
