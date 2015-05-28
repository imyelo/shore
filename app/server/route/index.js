var api = require('./api');
var main = require('./main');

module.exports = function (app) {
  app.use(api.privates.routes());
  app.use(api.publics.routes());
  app.use(main.routes());
};
