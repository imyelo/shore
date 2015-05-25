var Sequelize = require('sequelize');
var CONFIG = require('config').self.SEQUELIZE;

var Model = {};

var sequelize = new Sequelize(CONFIG.DATABASE, CONFIG.USERNAME, CONFIG.PASSWORD, {
  host: CONFIG.HOST,
  dialect: CONFIG.DIALECT,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: CONFIG.STORAGE
});

var initialize = function *() {
  return yield sequelize.sync({
    force: CONFIG.FORCE
  });
};

Model.sequelize = sequelize;
Model.initialize = initialize;

Model.Yacht = require('./yacht')(sequelize, Sequelize);

module.exports = Model;
