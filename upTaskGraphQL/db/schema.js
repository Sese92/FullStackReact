const { gql } = require('apollo-server');

const typeDefs = gql`

    type Token {
        token: String
    }

    type Project {
        name: String
        id: ID
    }

    type Query {
        getProjects: [Project]
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

    type Mutation {
        createUser(input: UserInput): String
        authenticateUser(input: AuthenticateUser): Token
        createProject(input: ProjectInput): Project
        updateProject(id: ID!, input: ProjectInput): Project
        removeProject(id: ID!): String
    }
`;

module.exports = typeDefs;