const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' })


const createToken = (user, secret, expiresIn) => {
    const { id, email } = user;

    return jwt.sign({ id, email }, secret, { expiresIn })
}

const resolvers = {
    Query: {

    },
    Mutation: {
        createUser: async (_, { input }) => {
            const { email, password } = input;

            const userExist = await User.findOne({ email })

            if (userExist) {
                throw new Error('The user is already register')
            }

            try {
                const salt = await bcryptjs.genSalt(10)
                input.password = await bcryptjs.hash(password, salt);

                const newUser = new User(input)
                newUser.save()
                return 'User created!'
            } catch (error) {
                console.log(error)
            }
        },
        authenticateUser: async (_, { input }) => {
            const { email, password } = input;

            // Revisar si el usuario existe
            const userExist = await User.findOne({ email })

            if (!userExist) {
                throw new Error('The user doesn`t exists')
            }

            // Revisar credenciales
            const correctPassword = await bcryptjs.compare(password, userExist.password)

            if (!correctPassword) {
                throw new Error('Incorrect password')
            }

            return {
                token: createToken(userExist, process.env.SECRET, '2hr')
            }
        }
    }
}

module.exports = resolvers;