'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Personils', 'nip', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'name'
    });

    await queryInterface.addColumn('Personils', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Personils', 'educationHistory', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    await queryInterface.addColumn('Personils', 'positionHistory', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Personils', 'nip');
  }
};
