'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dadu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dadu.init({
    idPlayer: DataTypes.INTEGER,
    daduName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dadu',
  });
  return dadu;
};