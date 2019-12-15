var AWS = require("aws-sdk");

var cartController = require('../controllers/cart.controllers');
AWS.config.update({
    region: "ap-southeast-1",
    accessKeyId: "AKIAIOWR4C2QRAMPFF4A",
    secretAccessKey: "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",
    endpoint: "dynamodb.ap-southeast-1.amazonaws.com"
  });

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.Merge =  async (localData, userID) => {

    var orderID = await cartController.getCartID(userID);

    var productsLocal = JSON.parse(localData);

    if(productsLocal.length <= 0) {
        return false;
    }

    productsLocal.forEach(async product => await cartController.addProductToOrder(
        orderID,
        product.ProductID,
        product.Quantity
    ));

    return true;
}

