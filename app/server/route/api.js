module.exports = function (app) {
  app.get('/api', function *() {
    this.body = {
      status: 0,
      msg: '',
      data: {}
    };
  });
};
