var redis = require('then-redis');
var config = require('config').self.REDIS;

var client = redis.createClient(config.PORT, config.HOST, {
  auth_pass: config.PASS
});

module.exports = client;
