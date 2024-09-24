'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sambutan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sambutan.belongsTo(models.Personil, {
        foreignKey: 'personil_id',
      });
    }
  }
  Sambutan.init({
    title: DataTypes.STRING,
    desc: DataTypes.TEXT, 
    personil_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sambutan',
  });
  return Sambutan;
};