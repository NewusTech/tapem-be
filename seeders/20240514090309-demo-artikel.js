'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Artikels = [
      {
        title: 'Lampung Utara Membuat Aplikasi Terbaru Ditahun 2024',
        slug: 'lampung-utara-membuat-aplikasi-terbaru-ditahun-2024',
        desc: 'Lampung Utara Membuat Aplikasi Terbaru Ditahun 2024 yaitu Geospacial',
        kategori_id: 1,
        image: 'https://newus-bucket.s3.ap-southeast-2.amazonaws.com/dir_mpp/artikel/1718850740338-image_20240608T043237125Z.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ];

    await queryInterface.bulkInsert('Artikels', Artikels, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Artikels', null, {});
  }
};
