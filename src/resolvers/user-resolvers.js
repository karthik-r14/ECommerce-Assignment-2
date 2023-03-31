import { config } from 'dotenv';
import { executeUserCreateOperation, executeUserReadOperation, executeUserUpdateOperation } from '../services/user-service.js';

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
    };
    return executeUserCreateOperation(userDocument);
}
