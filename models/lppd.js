'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lppd extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lppd.init({
    tanggalPublish: DataTypes.DATEONLY,
    kategori: DataTypes.STRING,
    jenisInformasi: DataTypes.STRING,
    subJenisInformasi: DataTypes.STRING,
    tipeDokumen: DataTypes.STRING,
    kandunganInformasi: DataTypes.TEXT,
    badanPublik: DataTypes.STRING,
    fileLampiran: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Lppd',
  });
  return Lppd;
};