const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
    comments: [Comment] # Add this line to include comments in the User type
}

type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

# Add this type definition for Comment
type Comment {
    book: String!
    username: String!
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
    title: String
    image: String
    link: String
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    removeBook (bookId: String!): User
    addComment(book: String!, username: String!, comment: String!): User # Add this line for the addComment mutation
}
`

module.exports=typeDefs;