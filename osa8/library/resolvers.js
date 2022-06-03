const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Author = require('./models/Author')
const Book = require('./models/Book')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
        const book = new Book({
          ...args,
          author: authorindatabase,
        })
        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } else {
        const author = new Author({
          name: args.author,
        })
        await author.save()
        const newAuthor = await Author.findOne({ name: args.author })
        const book = new Book({ ...args, author: newAuthor })

        await book.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
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

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
