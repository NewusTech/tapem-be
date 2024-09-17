'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('MediaBanners', [
      {
        title: 'Sekertaris Daerah',
        subTitle: 'Sekretariat DPRD Kabupaten Lampung Utara',
        description: 'Lampung Utara is a city in Indonesia located in the south-central part of the Lampung Province. It is the capital of the Lampung Regency.',
        mediaLink: 'https://www.youtube.com/watch?v=JTDpviGApFM',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MediaBanners', null, {})
  }
};
