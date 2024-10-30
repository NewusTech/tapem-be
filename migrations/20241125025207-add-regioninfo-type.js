'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('MediaBanners', 'typevideo', {
      type: Sequelize.SMALLINT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('MediaBanners', 'typevideo');
  }
};
