var co = require('co');
var Yacht = require('../model').Yacht;

module.exports = function *() {
  var yacht = yield Yacht.findById(this.params.id);

  console.log(yacht);

  if (!yacht) {
    this.throw(404);
  }

  this.redirect(yacht.source);

};
