const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

const connectDB = require('./config/db');

const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' })

// Connect to the db
connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers['authorization'] || '';
        if (token) {
            try {
                const user = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
                return {
                    user
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
});



server.listen().then(({ url }) => {
    console.log(`Server running at ${url}`)
})