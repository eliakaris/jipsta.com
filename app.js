var express = require('express'),
    routes = require('./routes'),
    blog = require('./blog'),
    http = require('http'),
    path = require('path'),
    nunjucks = require('nunjucks');

var app = express();

app.configure(function() {
  app.set('port', 3001);
  app.set('views', __dirname + '/views');
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(__dirname, 'views')));
env.express(app);

blog.init();
routes.init(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
