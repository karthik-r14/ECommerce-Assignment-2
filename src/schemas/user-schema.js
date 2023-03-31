import { buildSchema } from 'graphql';

export var userSchema = buildSchema(`
    type Query {
        user(userId: String!): User
    },
    type Mutation {
        editUserDetails(userId: String!, name: String!): User 
        createUser(userId: String!, name: String!, email: String!, address: String!): User   
    }
    type User {
        userId: String
        name: String
        email: String
        address: String
    }
`);