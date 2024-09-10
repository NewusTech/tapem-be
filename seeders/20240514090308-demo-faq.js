'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Faqs = [
      {
        question: 'Apa itu SIPETA?',
        answer: 'SIPETA adalah Sistem Pengelolaan Data Kewilayahan Lampung Utara',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Bagaimana cara mengakses layanan di SIPETA?',
        answer: 'Anda bisa mengakses  website resmi SIPETA.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Faqs', Faqs, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Faqs', null, {});
  }
};
