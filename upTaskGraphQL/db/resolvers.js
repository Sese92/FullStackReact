const User = require('../models/User');
const Project = require('../models/Project');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' })


const createToken = (user, secret, expiresIn) => {
    const { id, email } = user;

    return jwt.sign({ id, email }, secret, { expiresIn })
}

const resolvers = {
    Query: {
        getProjects: async (_, { }, ctx) => {
            const projects = await Project.find({ owner: ctx.user.id })

            return projects;
        }
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
            const user = await User.findOne({ email })

            if (!user) {
                throw new Error('The user doesn`t exists')
            }

            // Revisar credenciales
            const correctPassword = await bcryptjs.compare(password, user.password)

            if (!correctPassword) {
                throw new Error('Incorrect password')
            }

            return {
                token: createToken(user, process.env.SECRET, '2hr')
            }
        },
        createProject: async (_, { input }, ctx) => {
            try {
                const project = new Project(input)
                // Asociar el owner
                project.owner = ctx.user.id;

                const result = await project.save()
                return result;
            } catch (error) {
                console.log(error)
            }
        },
        updateProject: async (_, { id, input }, ctx) => {
            const project = await Project.findById(id)

            if (!project) {
                throw new Error('The project doesn`t exists')
            }

            // Revisar si el que trata de editarlo es el owner
            if (project.owner.toString() !== ctx.user.id) {
                throw new Error('This project isn`t yours!')
            }

            projectUpdated = await Project.findOneAndUpdate({ _id: id }, input, { new: true })
            return projectUpdated;
        },
        removeProject: async (_, { id }, ctx) => {
            const project = await Project.findById(id)

            if (!project) {
                throw new Error('The project doesn`t exists')
            }

            // Revisar si el que trata de editarlo es el owner
            if (project.owner.toString() !== ctx.user.id) {
                throw new Error('This project isn`t yours!')
            }

            projectToRemove = await Project.findByIdAndRemove({ _id: id });

            return "Project removed!"
        }
    }
}

module.exports = resolvers;