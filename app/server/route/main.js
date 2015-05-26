var main = require('../ctrl/main');

module.exports = function (app) {
  app.get('/:id', main);
};
