import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { createProductInUserCart, deleteProductFromUserCart, getUser, updateUserInfo, createUserInDb } from './resolvers/user-resolvers.js'
import { getProduct, getAllProducts, updateProductInfo, createProductInDb, deleteProductInDb } from './resolvers/product-resolvers.js'
import { createOrderInDb } from './resolvers/order-resolvers.js'
import { userSchema } from './schemas/user-schema.js';
import { productSchema } from './schemas/product-schema.js';
import { orderSchema } from './schemas/order-schema.js';
import { mergeSchemas } from '@graphql-tools/schema';

var root = {
    user: getUser,
    editUserDetails: updateUserInfo,
    createUser: createUserInDb,
    product: getProduct,
    browseAllProducts: getAllProducts,
    editProductDetails: updateProductInfo,
    createProduct: createProductInDb,
    deleteProduct: deleteProductInDb,
    addProductToUserCart: createProductInUserCart,
    removeProductFromUserCart: deleteProductFromUserCart,
    createOrder: createOrderInDb
};

const mergedSchema = mergeSchemas({
    schemas: [userSchema, productSchema, orderSchema]
})


// Create an express server and a GraphQL endpoint
var app = express();
app.use(
    '/graphql',
    graphqlHTTP({
        schema: mergedSchema,
        rootValue: root,
        graphiql: true,
    })
)
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));