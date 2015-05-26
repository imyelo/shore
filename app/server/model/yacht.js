var shortid = require('shortid');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('yacht', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      defaultValue: shortid.generate
    },
    source: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      }
    ]
  });
};
