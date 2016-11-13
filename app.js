'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// const todos = require('./models/todos');
const router = require('./routes');
module.exports = app; // this line is only used to make testing easier.

// remember to plug in your router and any other middleware you may need here.

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use('/', router);

// app.use(function(err, req, res, next) {
//   console.log('!!!!!!!!!!! in the error handler')
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: err
//   });
// });

if (!module.parent) app.listen(3000); // conditional prevents a very esotetiric EADDRINUSE issue with mocha watch + supertest + npm test.
