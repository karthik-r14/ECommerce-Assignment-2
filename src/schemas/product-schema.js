import { buildSchema } from 'graphql';

export var productSchema = buildSchema(`
type Query {
    product(productId: String!): Product
    browseAllProducts(productId: String): [Product]
},
type Mutation {
    editProductDetails(productId: String!, name: String!): Product
    createProduct(name: String!, desc: String!, price: String!): Product
    deleteProduct(productId: String!): Product
}
type Product {
    productId: String
    name: String
    desc: String
    price: String
}
`);
