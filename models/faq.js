'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faq extends Model {
    static associate(models) {
    }
  }
  Faq.init({
    question: DataTypes.STRING,
    answer: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Faq',
  });
  return Faq;
};