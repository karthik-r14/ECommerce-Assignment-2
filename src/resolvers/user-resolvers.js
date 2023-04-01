import { config } from 'dotenv';
import { executeCreateProductInCartOperation, executeUserCreateOperation, executeUserReadOperation, executeUserUpdateOperation } from '../services/user-service.js';

export var getUser = function (args) {
    config();
    var userId = args.userId;
    return executeUserReadOperation(userId);
}

export var updateUserInfo = function (args) {
    config();
    var userId = args.userId;
    var updatedUserName = args.name;
    return executeUserUpdateOperation(userId, updatedUserName);
}

export var createUserInDb = function (args) {
    config();
    const userDocument = {
        userId: args.userId,
        name: args.name,
        email: args.email,
        address: args.address,
        cart: []
    };
    return executeUserCreateOperation(userDocument);
}

export var createProductInUserCart = function (args) {
    config();
    var userId = args.userId;
    var productId = args.productId;

    return executeCreateProductInCartOperation(userId, productId);
}