import { buildSchema } from 'graphql';

export var orderSchema = buildSchema(`
type Mutation {
    createOrder(userId: String!, productIds: [String]!, totalAmount: String!): Order
}
type Order {
    orderId: String
    userId: String
    productIds: [String]
    totalAmount: String
    timeStamp: String
}
`);
