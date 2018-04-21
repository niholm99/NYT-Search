const express = require('express'); 
const bodyParser = require ('body-parser'); 
const logger = require('morgan'); 
const mongoose = require('mongoose');
const routes = require("./routes");
let db = require("./models");
let PORT = process.env.PORT || 8080;
let mongooseConnection = mongoose.connection;
let app = express();
const MONGODB_URI = require("./config/keys");

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // Allows For JSON Interactions Between Client & Server
app.use(express.static("client/build")); // Serve Static React Pages
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));


mongoose.Promise = global.Promise; 

mongoose.connect( // Connect to the Mongo DB
 MONGODB_URI || "mongodb://localhost/nytsearch",
);

mongooseConnection.on('error', console.error.bind(console, 'connection error:'));

mongooseConnection.once('open', function() {
  console.log(`Sucessfully Connected to Mongo DB !`); 
});

var cors = require("cors");
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());


app.use(routes); 

app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}!`);
});