var express = require('express');
var router = express.Router();

//LOAD the various controllers
//var controllerMain = require('../controllers/main');   //this will load the main controller file
var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb and Routes collection


//CODE to route /getAllOrders to appropriate  Controller function
//**************************************************************************
//***** mongodb get all of the Routes in Routes collection w
//      and Render information with an ejs view
router.get('/getAllOrders', controllerMongoCollection.getAllOrders);
