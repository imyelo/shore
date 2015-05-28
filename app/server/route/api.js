var Router = require('koa-middlewares').router;
var config = require('config');
var api = require('../ctrl/api');
var filter = require('../ctrl/filter');

var privates = new Router({
  prefix: '/api'
});

privates
  .use(filter.ip, filter.auth)
  .post('/yacht', api.create)
  .get('/yacht', api.list)
  .get('/yacht/:id', api.detail)
  .post('/yacht/:id', api.update)
  .delete('/yacht/:id', api.remove)
  .delete('/yacht', api.destroy);

var publics = new Router({
  prefix: '/api/basic'
});

publics
  .use(filter.ip)
  .post('/yacht', api.createThrottle, api.create);

exports.privates = privates;
exports.publics = publics;
