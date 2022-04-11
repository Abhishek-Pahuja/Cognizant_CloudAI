var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
const { exit } = require('process');
var prompt = require('prompt-sync')();
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://geru-mongo:lukfhpES1TMCbtUKF6npllAHpaa3Ua9VrK3M9mjJQ3IMFTf6YSrHUg6K6VfzDSIAh407hl16YNiJJoDgfVnjrQ==@geru-mongo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@geru-mongo@';

const option = parseInt(prompt("1. Create New Entry || 2. Search in Database "));

switch (option){
    case 1:
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db('mydb');
            var name = prompt('Enter name : ');
            var add = prompt('Enter address : ');
            var myobj = { name: name, address: add }
            dbo.collection('customers').insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          });
        break;
    case 2 : 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var value = prompt('Enter parameter value : ')
        const arr = (value.split(" "));    
        var dbo = db.db("mydb");
          for (let i = 0; i < arr.length; i++) {
            var query = {$or: [{name :{$regex :arr[i],$options : 'i'}},{address :{$regex :arr[i],$options : 'i'}}]}
            dbo
              .collection("customers")
              .find(query)
              .toArray(function (err, result) {
                if (err) throw err;
                else if (i == arr.length - 1) {
                  db.close();
                }
                else if (result.length>0){console.log(result)};
              });
          }
      });
      break;

    default:
        console.log('Enter Valid option')
}
