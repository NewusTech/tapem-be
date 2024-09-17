'use strict';

const { level } = require("winston");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Jabatans = [
      {
        title: 'Kepala Dinas',
        createdAt: new Date(),
        updatedAt: new Date(),
        level: 1
      },
      {
        title: 'Sekretaris Dinas',
        createdAt: new Date(),
        updatedAt: new Date(),
        level: 2
      },
      {
        title: 'Kepala Bidang',
        createdAt: new Date(),
        updatedAt: new Date(),
        level: 3
      },
      {
        title: 'Staff Khusus',
        createdAt: new Date(),
        updatedAt: new Date(),
        level: 4
      },
    ];

    await queryInterface.bulkInsert('Jabatans', Jabatans, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Jabatans', null, {});
  }
};
