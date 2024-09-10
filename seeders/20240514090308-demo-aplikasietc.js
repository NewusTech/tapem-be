'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Aplikasietcs = [
      {
        name: 'Sipeta',
        image: 'https://newus-bucket.s3.ap-southeast-2.amazonaws.com/superapps/assets/user.png',
        link: "https://sipeta.id/",
        desc: "Aplikasi Sipeta.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Aplikasietcs', Aplikasietcs, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Aplikasietcs', null, {});
  }
};
