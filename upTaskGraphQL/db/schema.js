const { gql } = require('apollo-server');

const typeDefs = gql`

    type Token {
        token: String
    }

    type Project {
        name: String
        id: ID
    }

    type Task {
        name: String
        id: ID
        project: String
        completed: Boolean
    }

    type Query {
        getProjects: [Project]
        getTasks(input: ProjectIDInput): [Task]
    }

    input ProjectIDInput{
        project: String!
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    input AuthenticateUser {
        email: String!
        password: String!
    }

    input ProjectInput {
        name: String!
    }

    input TaskInput {
        name: String!
        project: String
    }

    type Mutation {
        # Users
        createUser(input: UserInput): String
        authenticateUser(input: AuthenticateUser): Token

        # Projects
        createProject(input: ProjectInput): Project
        updateProject(id: ID!, input: ProjectInput): Project
        removeProject(id: ID!): String

        # Tasks
        createTask(input: TaskInput): Task
        updateTask(id: ID!, input: TaskInput, completed: Boolean): Task
        removeTask(id: ID!): String

    }
`;

module.exports = typeDefs;