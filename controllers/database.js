var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://rd7359:tiffany92!@ds245755.mlab.com:45755/heroku_8vdpfmgs';


/** getAllOrders controller connects to MongoDB database, queries the Orders collection to retrieve all the Orders
 *  and builds the output using the ejs template mongodb.ejs found in views directory
 * @param request
 * @param response
 *
 */
module.exports.getAllOrders =  function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        //get collection of orders
        var Orders = db.collection('Orders');


        //FIRST showing you one way of making request for ALL Orders and cycle through with a forEach loop on returned Cursor
        // this request and loop is to display content in the console log
        var c = Orders.find({});

        c.forEach(
            function(myDoc) {
                console.log( "_id: " + myDoc._id );  //just logging the output to the console
            }
        );


        //SECOND -show another way to make request for ALL Orders and simply collect the documents as an
        // array called docs that you  forward to the getAllOrders.ejs view for use there
        Orders.find().toArray(function (err, docs) {
            if(err) throw err;

            response.render('getAllOrders', {results: docs});

        });


        //Showing in comments here some alternative read (find) requests
        //this gets Orders by customer id and sorts by date
        // Orders.find({ "CUSTOMER_ID": "12345678" }).sort({ date: 1 }).toArray(function (err, docs) {
        // this sorts all the Orders by date
        //  Orders.find().sort({ date: 1 }).toArray(function (err, docs)) {


        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
};//end function
