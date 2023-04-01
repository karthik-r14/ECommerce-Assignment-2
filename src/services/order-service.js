import { MongoClient } from 'mongodb';
import { updateUserCartById } from '../services/user-service.js';

const DATABASE_NAME = 'E-Commerce-Database';
const ORDER_COLLECTION_NAME = 'orders';

export async function executeOrderCreateOperation(order) {
    const uri = process.env.DB_URI;
    let mongoClient;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db(DATABASE_NAME);
        const collection = db.collection(ORDER_COLLECTION_NAME);
        await createOrderDocument(collection, order);
        var newOrder = await findOrderById(collection, order.orderId);
        await removeProductsFromUsersCartUponOrderCreation(db, order.userId);
        return newOrder[0];
    } finally {
        await mongoClient.close();
    }
}

export async function connectToCluster(uri) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');

        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}

export async function createOrderDocument(collection, newOrder) {
    await collection.insertOne(newOrder);
}

export async function findOrderById(collection, orderId) {
    var order = await collection.find({ orderId }).toArray();
    return order;
}

export async function removeProductsFromUsersCartUponOrderCreation(db, userId) {
    const USER_COLLECTION_NAME = 'users';
    const collection = db.collection(USER_COLLECTION_NAME);
    await updateUserCartById(collection, userId, [])
}