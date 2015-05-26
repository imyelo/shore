var Yacht = require('../model').Yacht;
var shortid = require('shortid');

exports.list = function *() {
  var list = yield Yacht.findAll();
  this.body = list;
};

exports.detail = function *() {

};

exports.create = function *() {
  var ctx = this;
  var source = ctx.request.body.source;

  var id = shortid.generate();
  console.log(id, source);

};

exports.remove = function *() {

};
