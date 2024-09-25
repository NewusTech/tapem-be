'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personil extends Model {
    static associate(models) {
      Personil.belongsTo(models.Jabatan, {
        foreignKey: 'jabatan_id',
      });
    }
  }
  Personil.init({
    name: DataTypes.STRING,
    jabatan_id: DataTypes.INTEGER,
    image: DataTypes.STRING,
    nip: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    educationHistory: DataTypes.TEXT,
    positionHistory: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Personil',
  });
  return Personil;
};