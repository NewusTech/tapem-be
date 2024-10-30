'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RegionInfo extends Model {
    static associate(models) {
    }
  }
  RegionInfo.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    typevideo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RegionInfo',
  });
  return RegionInfo;
};