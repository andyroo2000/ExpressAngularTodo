var express = require('express');
var routes = require('.routes');
var http = require('http');
var path = require('path');
var app = express();


var todos = [{text: "get some milk", done: false, createdOn: "today"}];

app.get('/todos', function(req, res) {
  // return res.json(200, todos);
  res.send({text: "test item"});
});

app.put('/todos', function(req, res) {

});

app.post('/todos', function(req, res) {

});
