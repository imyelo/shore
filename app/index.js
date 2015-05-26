var co = require('co');
var koa = require('koa');
var middlewares = require('koa-middlewares');
var config = require('config');

var app = koa();

var Model = require('./server/model');
var route = require('./server/route');

co(function *() {

  var db = yield Model.initialize;

  // body parser
  app.use(middlewares.bodyParser());

  // routes
  app.use(middlewares.router(app));
  route(app);

  app.listen(config.self.PORT);

}).catch(function (err) {
  console.error(err);
});
