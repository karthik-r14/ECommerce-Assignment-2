import { MongoClient } from 'mongodb';

const DATABASE_NAME = 'E-Commerce-Database';
const USER_COLLECTION_NAME = 'users';

export async function executeUserCreateOperation(user) {
    const uri = process.env.DB_URI;
    let mongoClient;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db(DATABASE_NAME);
        const collection = db.collection(USER_COLLECTION_NAME);
        await createUserDocument(collection, user);
        var newUser = await findUserById(collection, user.userId);
        return newUser[0];
    } finally {
        await mongoClient.close();
    }
}

export async function executeUserReadOperation(userId) {
    const uri = process.env.DB_URI;
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db(DATABASE_NAME);
        const collection = db.collection(USER_COLLECTION_NAME);
        var myUser = await findUserById(collection, userId);
        return myUser[0];
    } finally {
        await mongoClient.close();
    }
}

export async function executeUserUpdateOperation(userId, newUserName) {
    const uri = process.env.DB_URI;
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db(DATABASE_NAME);
        const collection = db.collection(USER_COLLECTION_NAME);
        await updateUserById(collection, userId, newUserName);
        var myUser = await findUserById(collection, userId);
        return myUser[0];
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

export async function createUserDocument(collection, newUser) {
    await collection.insertOne(newUser);
}

export async function findUserById(collection, userId) {
    var myUser = await collection.find({ userId }).toArray();
    return myUser;
}

export async function updateUserById(collection, givenUserId, updatedUserName) {
    await collection.updateOne(
        { userId: givenUserId },
        { $set: { name: updatedUserName } }
    );
}