'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  player.init({
    playerName: DataTypes.STRING,
    point: DataTypes.INTEGER,
    idGame: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'player',
  });
  return player;
};