'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
     await queryInterface.addColumn(
      'Jabatans',
      'level',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        after: 'title'
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Jabatans', 'level');
  }
};
