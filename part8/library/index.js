const { startStandaloneServer } = require('@apollo/server/standalone')
const { default: mongoose } = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { ApolloServer } = require('@apollo/server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error))

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req.headers.authorization
    if (auth && auth.startsWith('Bearer ')) {
      try {
        const token = auth.substring(7)
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      } catch (error) {
        console.error('Error verifying token:', error.message)
      }
    }
    return {}
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
