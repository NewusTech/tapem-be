'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Galeris = [
      {
        title: 'ATM Center',
        image: 'https://newus-bucket.s3.ap-southeast-2.amazonaws.com/superapps/assets/user.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Pojok Baca Digital',
        image: 'https://newus-bucket.s3.ap-southeast-2.amazonaws.com/superapps/assets/user.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Play Land',
        image: 'https://newus-bucket.s3.ap-southeast-2.amazonaws.com/superapps/assets/user.png',
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
