import { buildSchema } from 'graphql';

export var userSchema = buildSchema(`
    type Query {
        user(userId: String!): User
    },
    type Mutation {
        editUserDetails(userId: String!, name: String!): User 
        createUser(userId: String!, name: String!, email: String!, address: String!): User
        addProductToUserCart(userId: String!, productId: String!): User,
        removeProductFromUserCart(userId: String!, productId: String!): User   
    }
    type User {
        userId: String
        name: String
        email: String
        address: String
        cart: [String]
    }
`);