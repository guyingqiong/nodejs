// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Schema = mongoose.Schema;
// create a schema
var userSchema = new Schema({
  ID: Number,
  quantity: Number
});
var fs = require("fs");
var User = mongoose.model('User', userSchema);
module.exports = User;

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.get('/listitems', function (req, res) {
   fs.readFile( "data/users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.get('/removeitem/:id', function (req, res) {
   console.log( req.params.id );
   // First read existing users.
   fs.readFile( "data/users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
	   
       delete data[req.params.id];
       
       console.log( data );
	   fs.writeFile( "data/users.json", JSON.stringify(data), function (err){
		   if (err) return console.log(err);
           console.log('Write completed!');
		   });
       res.end( JSON.stringify(data));
   });
})

app.get('/removeall', function (req, res) {

   // First read existing users.
   fs.readFile( "data/users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
	   data ={};
       
       console.log( data );
	   fs.writeFile( "data/users.json", JSON.stringify(data), function (err){
		   if (err) return console.log(err);
           console.log('Write completed!');
		   });
       res.end( JSON.stringify(data));
   });
})

app.get('/additem/:id', function (req, res) {
   // First read existing users.

   fs.readFile(  "data/users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );

	     if (!(req.params.id in data))
           data[req.params.id] = 1;
		   else 
		     data[req.params.id] =data[req.params.id] +1;
       console.log( data );
	   fs.writeFile( "data/users.json", JSON.stringify(data), function (err){
		   if (err) return console.log(err);
           console.log('Write completed!');
		   });
	   
       res.end( JSON.stringify(data));
   });
   
   
})

app.get('/additems/:id/:quantity', function (req, res) {
   // First read existing users.

   fs.readFile(  "data/users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
	   
	   if (!(req.params.id in data))
           data[req.params.id] = req.params.quantity;
		   else 
		     data[req.params.id] =(data[req.params.id]-0) +(req.params.quantity-0);
       console.log( data );
	   fs.writeFile( "data/users.json", JSON.stringify(data), function (err){
		   if (err) return console.log(err);
           console.log('Write completed!');
		   });
	   
       res.end( JSON.stringify(data));
   });
   
   
})


app.get('/updateitem/:id/:quantity', function (req, res) {
   // First read existing users.

   fs.readFile(  "data/users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data[req.params.id] = req.params.quantity;
		
       console.log( data );
	   fs.writeFile( "data/users.json", JSON.stringify(data), function (err){
		   if (err) return console.log(err);
           console.log('Write completed!');
		   });
       res.end( JSON.stringify(data));
   });
})
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);