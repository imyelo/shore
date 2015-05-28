var co = require('co');
var CONSTANT = require('../constant');
var redis = require('../lib/redis');
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

exports.createThrottle = function *(next) {
  var ip = this.getIp();
  var key = CONSTANT.YACHT_CREATE_CACHE_KEY_PREFIX + ip;
  var count = +(yield redis.get(key));
  if (count >= CONSTANT.YACHT_CREATE_LIMIT_BURST) {
    this.status = 403;
    this.message = ['out of limit (',
      CONSTANT.YACHT_CREATE_LIMIT_BURST,
      '/',
      CONSTANT.YACHT_CREATE_LIMIT_DURATION,
      's).'].join('');
    return;
  }
  redis.set(key, ++count, 'EX', CONSTANT.YACHT_CREATE_LIMIT_DURATION);
  yield next;
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
