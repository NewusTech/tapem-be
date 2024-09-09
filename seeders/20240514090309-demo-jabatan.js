'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Jabatans = [
      {
        title: 'Kepala Dinas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Sekretaris Dinas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Kepala Bidang',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Staff Khusus',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Jabatans', Jabatans, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Jabatans', null, {});
  }
};
