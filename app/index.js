var co = require('co');
var koa = require('koa');
var middlewares = require('koa-middlewares');
var config = require('config');

var Model = require('./server/model');
var route = require('./server/route');

var app = koa();
var server;

co(function *() {

  var db = yield Model.initialize;

  // settings
  app.proxy = true;

  // body parser
  app.use(middlewares.bodyParser());

  // routes
  app.use(middlewares.router(app));
  route(app);

  app.listen(config.self.PORT);

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
