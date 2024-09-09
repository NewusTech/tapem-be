'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tupoksi extends Model {
    static associate(models) {
    }
  }
  Tupoksi.init({
    tugaspokok: DataTypes.TEXT,
    fungsiutama: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Tupoksi',
  });
  return Tupoksi;
};