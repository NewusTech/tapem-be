'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Personils = [
      {
        name: 'M. Andika Salman Nasution',
        jabatan_id: 1,
        image: 'https://newus-bucket.s3.ap-southeast-2.amazonaws.com/superapps/assets/user.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Abdul Karim',
        jabatan_id: 2,
        image: 'https://newus-bucket.s3.ap-southeast-2.amazonaws.com/superapps/assets/user.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tania Amarzaria Zeysia',
        jabatan_id: 3,
        image: 'https://newus-bucket.s3.ap-southeast-2.amazonaws.com/superapps/assets/user.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Personils', Personils, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Personils', null, {});
  }
};
