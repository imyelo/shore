var co = require('co');
var koa = require('koa');
var middlewares = require('koa-middlewares');

var app = koa();

var Model = require('./server/model');
var route = require('./server/route');

co(function *() {

  var db = yield Model.initialize;

  console.log('database ready');

  // routes
  app.use(middlewares.router(app));
  route(app);

  app.listen(3000);
}).catch(function (err) {
  console.error(err);
});
