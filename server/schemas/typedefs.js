const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    _id: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
    comments: [Comment] # Add this line to include comments in the User type
}


# Add this type definition for Comment
type Comment {
    bookId: ID!
    content: String!
}

type Auth {
    token: ID!
    user: User
}

input BookInput{

   

    bookId: ID!

    authors: [String]
    description: String
    title: String!
    image: String
    link: String
    comments: [CommentInput]
}

input CommentInput {
    bookId: ID!
    content: String! # Add this line
  }

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    removeBook (bookId: String!): User
    addComment(bookId: ID!, content: String!): User # Add this line for the addComment mutation
}
`;

module.exports = typeDefs;
