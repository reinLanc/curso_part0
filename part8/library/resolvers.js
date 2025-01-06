const { UserInputError, GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }
      return Book.find(filter).populate('author')
    },
    allAuthors: async (root, args, { Author, Book }) => {
      const authors = await Author.find({})
      const books = await Book.find({})
      return authors.map((author) => ({
        ...author._doc,
        bookCount: books.filter((book) => book.author.equals(author.id)).length,
      }))
    },
    me: async (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id,
      })

      await book.save()
      const populatedBook = await book.populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

      return populatedBook
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        throw new UserInputError('Author not found')
      }

      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        })
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        })
      }

      try {
        const token = jwt.sign(
          {
            id: user._id,
            username: user.username,
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        )
        return { value: token }
      } catch (error) {
        console.error('Error generating token:', error.message)
        throw new Error('Failed to generate token')
      }
    },
  },
  Author: {
    bookCount: async (author) => {
      const books = await Book.find({ author: author._id })
      return books.length
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers