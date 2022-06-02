const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')

const MONGODB_URI =
  'mongodb+srv://juh3:Natsumongo123@osa8.6aeay.mongodb.net/BookDatabase?retryWrites=true&w=majority'
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`
const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      if (args.author) {
        const wantedAuthor = await Author.findOne({
          name: args.author,
        })
        console.log(wantedAuthor)
        if (wantedAuthor) {
          console.log('im here')
          if (args.genre && args.author) {
            return (
              (await Book.find({ genres: { $in: [args.genre] } })) &&
              (await Book.find({
                author: { $in: [wantedAuthor.id] },
              }))
            )
          } else {
            return await Book.find({
              author: { $in: [wantedAuthor.id] },
            })
          }
        }

        if (!args.genre) {
          return await Book.find({})
        } else {
          return Book.find({ genres: { $in: [args.genre] } })
        }
      }
    },

    allAuthors: async (root, args) => {
      return Author.find({})
    },
  },

  /*Author: {
    bookCount: (root) =>
      books.filter((v) => v.author === root.name).length,
  },*/

  Mutation: {
    addBook: async (root, args) => {
      const authorObject = new Author({
        name: args.author,
        born: null,
      })
      /*if (authors.includes(args.author)) {
        books = books.concat(bookObject)
        return bookObject
      } else {
        const authorObject = {
          name: args.author,
          born: null,
          id: uuid(),
        }*/
      await authorObject.save()
      const newAuthor = await Author.findOne({ name: args.author })
      const bookObject = new Book({ ...args, author: newAuthor })

      return bookObject.save()
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return author.save()
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
