
/**
 * Module dependencies.
 */
 var config = require('./config.js');
var express = require('express')
  , routes = require('./routes');
var mongoose = require('mongoose');
mongoose.connect(config.db.mongodb);
var models = require('./models')({ mongoose: mongoose });
//var providers = require('./providers')({models: models, mongoose: mongoose});
var controllers = require('./controllers')({mongoose: mongoose});
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
routes.setup({
    'controllers': controllers,
    'app': app
});

app.listen(process.env.port || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
