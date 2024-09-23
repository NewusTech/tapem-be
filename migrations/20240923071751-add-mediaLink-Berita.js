'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Artikels', 'mediaLink', {
      type: Sequelize.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Artikels', 'mediaLink')
  }
};
