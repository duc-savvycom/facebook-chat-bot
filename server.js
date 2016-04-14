var http = require('http');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var async = require('async');

var express = require('express');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var server = http.createServer(app);

app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === '123') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log(`Server start at port: ${process.env.PORT || 3000}`);
});
