'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Personils = [
      {
        name: 'M. Andika Salman Nasution',
        jabatan_id: 1,
        image: 'https://newus-bucket.s3.ap-southeast-2.amazonaws.com/superapps/assets/user.png',
        nip: '1234567890',
        phoneNumber: '081234567890',
        educationHistory: 'S1 Teknik Informatika',
        positionHistory: 'Kepala Dinas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Abdul Karim',
        jabatan_id: 2,
        image: 'https://newus-bucket.s3.ap-southeast-2.amazonaws.com/superapps/assets/user.png',
        nip: '1234567890',
        phoneNumber: '081234567890',
        educationHistory: 'S1 Ilmu Pemerintahan',
        positionHistory: 'Sekertaris Dinas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tania Amarzaria Zeysia',
        jabatan_id: 3,
        nip: '1234567890',
        phoneNumber: '081234567890',
        educationHistory: 'S1 Teknik Informatika',
        positionHistory: 'Kepala Bidang',
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
