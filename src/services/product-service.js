import { MongoClient } from 'mongodb';

const DATABASE_NAME = 'E-Commerce-Database';
const PRODUCT_COLLECTION_NAME = 'products';


export async function executeProductReadOperation(productId) {
    const uri = process.env.DB_URI;
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db(DATABASE_NAME);
        const collection = db.collection(PRODUCT_COLLECTION_NAME);
        var product = await findProductById(collection, productId);
        return product[0];
    } finally {
        await mongoClient.close();
    }
}

export async function executeProductCreateOperation(product) {
    const uri = process.env.DB_URI;
    let mongoClient;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db(DATABASE_NAME);
        const collection = db.collection(PRODUCT_COLLECTION_NAME);
        await createProductDocument(collection, product);
        var newProduct = await findProductById(collection, product.productId);
        return newProduct[0];
    } finally {
        await mongoClient.close();
    }
}

export async function executeProductUpdateOperation(productId, newName) {
    const uri = process.env.DB_URI;
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db(DATABASE_NAME);
        const collection = db.collection(PRODUCT_COLLECTION_NAME);
        await updateProductById(collection, productId, newName);
        var product = await findProductById(collection, productId);
        return product[0];
    } finally {
        await mongoClient.close();
    }
}

export async function executeProductDeleteOperation(productId) {
    const uri = process.env.DB_URI;
    let mongoClient;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db(DATABASE_NAME);
        const collection = db.collection(PRODUCT_COLLECTION_NAME);
        await deleteProductDocument(collection, productId);
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


export async function findProductById(collection, productId) {
    var Product = await collection.find({ productId }).toArray();
    return Product;
}

export async function createProductDocument(collection, newProduct) {
    await collection.insertOne(newProduct);
}

export async function updateProductById(collection, givenProductId, updatedName) {
    await collection.updateOne(
        { productId: givenProductId },
        { $set: { name: updatedName } }
    );
}

export async function deleteProductDocument(collection, prodId) {
    await collection.deleteOne({ productId: prodId })
}