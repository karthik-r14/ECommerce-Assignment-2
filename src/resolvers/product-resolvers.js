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
    var productName = args.name;
    return executeProductUpdateOperation(productId, productName);
}

export var createProductInDb = function (args) {
    config();
    const productDocument = {
        productId: args.productId,
        name: args.name,
        desc: args.desc,
        price: args.price
    };
    return executeProductCreateOperation(productDocument);
}

export var deleteProductInDb = function (args) {
    config();
    var productId = args.productId
    return executeProductDeleteOperation(productId);
}
