const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const User = require('./models/User')

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

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
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

    editGenre(username: String!, genre: String!): User!

    createUser(username: String!): User
    login(username: String!, password: String!): Token
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
      }
      if (!args.genre) {
        return await Book.find({}).populate('author')
      } else {
        return Book.find({ genres: { $in: [args.genre] } })
      }
    },

    allAuthors: async (root, args) => {
      return Author.find({})
    },

    me: (root, args, context) => {
      return context.currentUser
    },
  },

  /*Author: {
    bookCount: (root) =>
      books.filter((v) => v.author === root.name).length,
  },*/

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const authorindatabase = await Author.findOne({
        name: args.author,
      })
      if (authorindatabase) {
        const bookObject = new Book({
          ...args,
          author: authorindatabase,
        })
        try {
          return bookObject.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } else {
        const authorObject = new Author({
          name: args.author,
        })
        await authorObject.save()
        const newAuthor = await Author.findOne({ name: args.author })
        const bookObject = new Book({ ...args, author: newAuthor })

        return bookObject.save()
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        return author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

    editGenre: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      user.favouriteGenre = args.genre
      try {
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
