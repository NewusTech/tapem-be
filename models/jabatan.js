'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jabatan extends Model {
    static associate(models) {
      Jabatan.hasMany(models.Personil, {
        foreignKey: 'jabatan_id',
      });
    }
  }
  Jabatan.init({
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Jabatan',
  });
  return Jabatan;
};