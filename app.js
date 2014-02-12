
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index', {title: 'Express'});
});



// This will go into its own file







var todos = [];

app.get('/todos', function(req, res) {
  return res.json(200, todos);
});

app.put('/todos', function(req, res) {
  var status = req.body;
  var index = status.index;
  todos[index] = status.done;
  return res.json(200, todos);
});

app.post('/todos', function(req, res) {
  todo = req.body;
  todos.unshift(todo);
  return res.json(200, todos);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
