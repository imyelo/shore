module.exports = function (app) {
  require('./api')(app);
  require('./main')(app);
};
