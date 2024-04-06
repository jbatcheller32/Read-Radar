const { default: mongoose } = require('mongoose');
const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query:{
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
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
    saveBook: async(parent, {book}, context) => {
      if (context.user) {
        const bookdata = await Book.create(book)
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookdata._id } },
          { new: true, runValidators: true }
        );
        return bookdata;
      }
      throw AuthenticationError;
    },
    addComment: async(parent, { book, username, comment }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { comments: { book, username, comment } } },
          { new: true, runValidators: true }
        );
        return user;
      }
      throw AuthenticationError;
    },
    
    removeBook: async (parent, { bookId }, context) => {
      // console.log("bookId", bookId)
      // const objectID = new mongoose.Types.ObjectId(bookId);
      // console.log("objectID", objectID);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          // { $pull: { savedBooks: { _id: bookId } } }, // target the _id field of the books
          { $pull: { savedBooks: bookId  } }, // target the _id field of the books

          { new: true }
        ).populate('savedBooks');
    
        if (!updatedUser) {
          throw new Error('No user with this id!');
        }
    
        return updatedUser;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
  },
}

module.exports=resolvers;