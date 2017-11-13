var express = require('express');
var router = express.Router();

//LOAD the various controllers
//var controllerMain = require('../controllers/main');   //this will load the main controller file
var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb and Orders collection

//**************************************************************************
//* mongodb: get all of the Orders in Orders collection for _id
//  and sort by the customer id. Render information in the views/pages/getAllOrders.ejs
router.get('/getAllOrders', function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;
        //get collection of Orders
        var Orders = db.collection('Orders');
        //get all Orders
        Orders.find({ }).sort({ _id: 1 }).toArray(function (err, docs) {
            if(err) throw err;
            response.render('getAllOrders', {results: docs});
        });

        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect

});//end router.get

//CODE to route /getAllOrders to appropriate  Controller function
//**************************************************************************
//* mongodb: get all of the Orders in Orders collection
//  and render information with an ejs view
router.get('/getAllOrders', controllerMongoCollection.getAllOrders);
