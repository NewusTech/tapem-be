'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lppds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggalPublish: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      kategori: {
        type: Sequelize.STRING,
        allowNull:true
      },
      jenisInformasi: {
        type: Sequelize.STRING,
        allowNull:true
      },
      subJenisInformasi: {
        type: Sequelize.STRING,
        allowNull:true
      },
      tipeDokumen: {
        type: Sequelize.STRING,
        allowNull:true
      },
      kandunganInformasi: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      badanPublik: {
        type: Sequelize.STRING,
        allowNull:true
      },
      fileLampiran : {
        type: Sequelize.STRING,
        allowNull:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lppds');
  }
};