const express = require("express");
const app = require("express")();
const path = require("path");
const bodyParser =  require("body-parser");
const PORT = process.env.PORT || 3001;
const routes = require('./routes');
const session = require("express-session");
const MongoClient = require('mongodb').MongoClient;
const passport = require('./lib/passport');
const proxy = require('express-http-proxy');
const logger = require('morgan');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static("./client/build"));

app.set('trust proxy', 1);
app.use(session({secret: "beesnees", proxy:true, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);


app.listen(PORT, function(){
      console.log("listening...");
});
