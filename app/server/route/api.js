var api = require('../ctrl/api');

module.exports = function (app) {
  app.get('/api/yacht', api.list);
  app.get('/api/yacht/:id', api.detail);
  app.post('/api/yacht', api.create);
  app.post('/api/yacht/:id', api.update);
  app.delete('/api/yacht/:id', api.remove);
  app.delete('/api/yacht', api.destroy);
};
