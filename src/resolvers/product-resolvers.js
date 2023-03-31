import { config } from 'dotenv';
import { executeProductReadOperation, executeProductCreateOperation, executeProductUpdateOperation, executeProductDeleteOperation } from '../services/product-service.js';

export var getProduct = function (args) {
    config();
    var productId = args.productId;
    return executeProductReadOperation(productId);
}

export var updateProductInfo = function (args) {
    config();
    var productId = args.productId;
    var productTitle = args.title;
    return executeUserUpdateOperation(productId, productTitle);
}

export var createProductInDb = function (args) {
    config();
    const productDocument = {
        productId: args.productId,
        title: args.title,
        author: args.author,
        desc: args.desc,
        topic: args.topic
    };
    return executeProductCreateOperation(productDocument);
}

export var deleteProductInDb = function (args) {
    config();
    const productDocument = {
        productId: args.productId
    };
    return executeProductDeleteOperation(productId);
}
