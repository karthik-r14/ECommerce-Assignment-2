import { config } from 'dotenv';
import { executeOrderCreateOperation } from '../services/order-service.js';
import { uuid } from 'uuidv4';


export var createOrderInDb = function (args) {
    config();
    const orderDocument = {
        orderId: uuid(),
        userId: args.userId,
        productIds: args.productIds,
        totalAmount: args.totalAmount,
        timeStamp: Date.now().toString()
    };


    return executeOrderCreateOperation(orderDocument);
}
