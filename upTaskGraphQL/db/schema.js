const { gql } = require('apollo-server');

const typeDefs = gql`

    type Course {
        title: String,
    }

    type Technology {
        technology: String
    }

    type Query {
        getCourses: [Course]

        getTechnology: [Technology]
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

    type Token {
        token: String
    }

    type Mutation {
        createUser(input: UserInput): String
        authenticateUser(input: AuthenticateUser): Token
    }
`;

module.exports = typeDefs;