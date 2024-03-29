var AWS = require("aws-sdk");
var linq = require('async-linq');

AWS.config.update({
    region: "ap-southeast-1",
    accessKeyId: "AKIAIOWR4C2QRAMPFF4A",
    secretAccessKey: "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",
    endpoint: "dynamodb.ap-southeast-1.amazonaws.com"
  });
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getAllUser = () => {
    return new Promise( async (resolve, reject) => {
        var params = {
            TableName : "Users"
        }
        docClient.scan(params, function(err, data) {
            if (err) {
                return reject(err);
            } else {
                var lsUser = linq(data.Items)
                    .where(function (v) { if(v.UserID==v.Varies) return v; })
                    .run();
                return resolve(lsUser);
            }
        });
    })
}

module.exports.getAllOrder = () => {
    return new Promise( async (resolve, reject) => {
        var params = {
            TableName : "Users"
        }
        docClient.scan(params, function(err, data) {
            if (err) {
                return reject(err);
            } else {
                var lsUser = linq(data.Items)
                    .where(function (v) { if(v.UserID!=v.Varies) return v; })
                    .run();
                return resolve(lsUser);
            }
        });
    })
}

module.exports.getAllOrderDetail = () => {
    return new Promise( async (resolve, reject) => {
        var params = {
            TableName : "Orders"
        }
        docClient.scan(params, function(err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(data.Items);
            }
        });
    })
}