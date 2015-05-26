var api = require('../ctrl/api');

module.exports = function (app) {
  app.get('/api', api.list);
  app.get('/api/:id', api.detail);
  app.post('/api', api.create);
  app.delete('/api', api.remove);
};
