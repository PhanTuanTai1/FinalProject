var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-southeast-1",
    accessKeyId: "AKIAIOWR4C2QRAMPFF4A",
    secretAccessKey: "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",
    endpoint: "dynamodb.ap-southeast-1.amazonaws.com"
  });

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getProductByID = (id) => {
    return new Promise( async (resolve, reject) => {
        var paramsProductID = {
            TableName : "Products",
            IndexName : "ProductIDIndex",
            KeyConditionExpression: "ProductID = :productID",
            ExpressionAttributeValues: {
                ":productID": id
            }
        };
        docClient.query(paramsProductID, function(err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(data.Items[0]);
            }
        });
    })
}


