var api = require('../ctrl/api');
var filter = require('../ctrl/filter');
var auth = require('koa-basic-auth');
var config = require('config');

module.exports = function (app) {
  app.get('/api/yacht', filter.ip, filter.auth, auth({ name: config.self.AUTH.NAME, 'pass': config.self.AUTH.PASS}), api.list);
  app.get('/api/yacht/:id', api.detail);
  app.post('/api/yacht', api.create);
  app.post('/api/yacht/:id', api.update);
  app.delete('/api/yacht/:id', api.remove);
  app.delete('/api/yacht', api.destroy);
};
