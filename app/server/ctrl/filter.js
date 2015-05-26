var thunkify = require('thunkify');
var redis = require('../lib/redis');
var CONSTANT = require('../constant');

exports.ip = function *(next) {
  var ctx = this;
  this.getIp = function () {
    return ctx.ips[this.ips.length - 1] || '0.0.0.0';
  };
  yield next;
};

exports.auth = function *(next) {
  var ip = this.getIp();
  var key = CONSTANT.AUTH_CACHE_KEY_PREFIX + ip;
  var count = +(yield redis.get(key));
  if (count >= CONSTANT.AUTH_MAX_FAIL_TIMES) {
    return this.throw(403);
  }

  try {
    yield next;
  } catch (err) {
    if (err.status === 401) {
      redis.set(key, ++count, 'EX', CONSTANT.AUTH_CACHE_EXPIRE);
    }
    throw err;
  }

};
