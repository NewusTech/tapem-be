'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Galeris = [
      {
        title: 'ATM Center',
        image: 'https://newus-bucket.s3.ap-southeast-2.amazonaws.com/dir_mpp/facilities/1718851667106-1718753258499-images (1).jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Pojok Baca Digital',
        image: 'https://newus-bucket.s3.ap-southeast-2.amazonaws.com/dir_mpp/facilities/1718851671545-1718757057946-Mal-Pelayanan-Publik-lewat-fasilitas-Pojok-Baca-Digital-alias-Pocadi-Jumat-1312022.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Play Land',
        image: 'https://newus-bucket.s3.ap-southeast-2.amazonaws.com/dir_mpp/facilities/1718851677530-1718758700732-fit_1635178530_9bee76a9d0263f26e020.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Galeris', Galeris, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Galeris', null, {});
  }
};
