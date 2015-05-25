module.exports = function (sequelize, DataTypes) {
  return sequelize.define('yacht', {
    id: {
      type: DataTypes.STRING
    },
    source: {
      type: DataTypes.STRING
    }
  });
};
