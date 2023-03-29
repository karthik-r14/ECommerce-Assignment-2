import { config } from 'dotenv';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { executeUserCreateOperation, executeUserReadOperation, executeUserUpdateOperation } from './user-service.js';

var schema = buildSchema(`
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

var getUser = function (args) {
    config();
    var userId = args.userId;
    return executeUserReadOperation(userId);
}

var updateUserInfo = function (args) {
    config();
    var userId = args.userId;
    var updatedUserName = args.name;
    return executeUserUpdateOperation(userId, updatedUserName);
}

var createUserInDb = function (args) {
    config();
    const userDocument = {
        userId : args.userId,
        name: args.name,
        email: args.email,
        address: args.address,
    };
    return executeUserCreateOperation(userDocument);
}

var root = {
    user: getUser,
    editUserDetails: updateUserInfo,
    createUser: createUserInDb
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));