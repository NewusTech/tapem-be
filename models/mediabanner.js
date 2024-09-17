'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MediaBanner extends Model {
    static associate(models) {
    }
  }
  MediaBanner.init({
    title: DataTypes.STRING,
    subTitle: DataTypes.STRING,
    mediaLink: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'MediaBanner',
  });
  return MediaBanner;
};