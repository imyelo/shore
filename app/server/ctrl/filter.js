var config = require('config');
var auth = require('koa-basic-auth')({ name: config.self.AUTH.NAME, 'pass': config.self.AUTH.PASS});
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
  var key = CONSTANT.AUTH_FAIL_CACHE_KEY_PREFIX + ip;
  var count = +(yield redis.get(key));
  if (count >= CONSTANT.ATUH_FAIL_LIMIT_BURST) {
    return this.throw(403);
  }

  try {
    yield auth.call(this, next);
  } catch (err) {
    if (err.status === 401) {
      redis.set(key, ++count, 'EX', CONSTANT.AUTH_FAIL_LIMIT_DURATION);
    }
    throw err;
  }

};
