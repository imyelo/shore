var co = require('co');
var koa = require('koa');
var middlewares = require('koa-middlewares');
var view = require('koa-views');
var config = require('config');
var path = require('path');

var Model = require('./server/model');
var route = require('./server/route');

var app = koa();
var server;

co(function *() {

  var db = yield Model.initialize;

  // settings
  app.proxy = true;

  // favicon
  app.use(middlewares.favicon(path.join(__dirname, './public/favicon.ico')));

  // static
  app.use(middlewares.staticCache(path.join(__dirname, './public'), {
    prefix: '/public',
    buffer: false,
    maxAge: 0
  }));

  // body parser
  app.use(middlewares.bodyParser());

  // view
  app.use(view(path.join(__dirname, './view'), {
    map: {
      html: 'ejs'
    }
  }));

  // routes
  app.use(middlewares.router(app));
  route(app);

  // start server
  (function () {
    var hostname = process.env.HOSTNAME;
    var port = config.self.PORT;
    if (process.env.NODE_ENV !== 'test') {
      server = app.listen(port, hostname, function() {
        console.log('%s server listening on %s with port %s', config.name, hostname, server.address().port);
      });
    }
  })();

}).catch(function (err) {
  console.error(err);
});
