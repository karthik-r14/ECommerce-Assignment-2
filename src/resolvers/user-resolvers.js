import { config } from 'dotenv';
import { executeCreateProductInCartOperation, executeDeleteProductInCartOperation, executeUserCreateOperation, executeUserReadOperation, executeUserUpdateOperation } from '../services/user-service.js';
import { uuid } from 'uuidv4';


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
        userId: uuid(),
        name: args.name,
        email: args.email,
        address: args.address,
        cart: [],
        orders: []
    };
    return executeUserCreateOperation(userDocument);
}

export var createProductInUserCart = function (args) {
    config();
    var userId = args.userId;
    var productId = args.productId;

    return executeCreateProductInCartOperation(userId, productId);
}

export var deleteProductFromUserCart = function (args) {
    config();
    var userId = args.userId;
    var productId = args.productId;

    return executeDeleteProductInCartOperation(userId, productId);

}