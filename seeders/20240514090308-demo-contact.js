'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Contacts = [
      {
        alamat: 'Jl. Jend. Sudirman No.1, Kota Gapura, Kec. Kotabumi, Kabupaten Lampung Utara, Lampung 34516',
        email: 'tapem.lampungutara@gmail.co.id',
        telp: '081212121212',
        latitude: '-4.8884219',
        longitude: '104.8440186',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Contacts', Contacts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Contacts', null, {});
  }
};
