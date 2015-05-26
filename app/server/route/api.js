var api = require('../ctrl/api');
var filter = require('../ctrl/filter');
var config = require('config');
var auth = require('koa-basic-auth')({ name: config.self.AUTH.NAME, 'pass': config.self.AUTH.PASS});

module.exports = function (app) {
  app.get('/api/yacht', filter.ip, filter.auth, auth, api.list);
  app.get('/api/yacht/:id', filter.ip, filter.auth, auth, api.detail);
  app.post('/api/yacht', filter.ip, filter.auth, auth, api.create);
  app.post('/api/yacht/:id', filter.ip, filter.auth, auth, api.update);
  app.delete('/api/yacht/:id', filter.ip, filter.auth, auth, api.remove);
  app.delete('/api/yacht', filter.ip, filter.auth, auth, api.destroy);
};
