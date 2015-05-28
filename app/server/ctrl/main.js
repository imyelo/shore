var co = require('co');
var Yacht = require('../model').Yacht;

exports.home = function *() {
  yield this.render('index');
};

exports.resolve = function *() {
  var yacht = yield Yacht.findById(this.params.id);

  if (!yacht) {
    this.throw(404);
  }

  this.redirect(yacht.source);

};
