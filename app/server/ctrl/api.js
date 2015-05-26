var co = require('co');
var Yacht = require('../model').Yacht;

exports.list = function *() {
  var list = yield Yacht.findAll();
  this.body = list;
};

exports.detail = function *() {
  var yacht = yield Yacht.findById(this.params.id);

  if (!yacht) {
    return this.throw(404);
  }

  this.body = yacht;
};

exports.create = function *() {
  var source = this.request.body.source;

  this.body = yield Yacht.create({
    source: source
  });

};

exports.update = function *() {
  var yacht = yield Yacht.findById(this.params.id);

  if (!yacht) {
    return this.throw(404);
  }

  yacht.source = this.request.body.source;

  this.body = yield yacht.save();
};

exports.remove = function *() {
  var effected = yield Yacht.destroy({
    where: {
      id: this.params.id
    }
  });

  if (!effected) {
    return this.throw(404);
  }

  this.body = 'ok';
};

exports.destroy = function *() {
  yield Yacht.destroy({
    truncate: true
  });

  this.body = 'ok';
};
