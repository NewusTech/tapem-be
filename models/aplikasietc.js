'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aplikasietcs extends Model {
    static associate(models) {
    }
  }
  Aplikasietcs.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    link: DataTypes.STRING,
    desc: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Aplikasietcs',
  });

  Aplikasietcs.addHook('beforeFind', (options) => {
    if (!options.order) {
      options.order = [['id', 'ASC']]; // Default order by createdAt DESC
    }
  });
  return Aplikasietcs;
};