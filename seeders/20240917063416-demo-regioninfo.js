'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.bulkInsert('RegionInfos', [
      {
        image: 'https://newus-bucket.s3.ap-southeast-2.amazonaws.com/gis_lokal/assets/image.png',
        title: 'Kabupaten Lampung Utara',
        description: 'Lampung Utara is a city in Indonesia located in the south-central part of the Lampung Province. It is the capital of the Lampung Regency.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.bulkDelete('RegionInfos', null, {});
  }
};
