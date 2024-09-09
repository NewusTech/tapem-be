'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Tupoksis = [
      {
        tugaspokok: '<p>Mengelola administrasi pemerintahan di tingkat kabupaten, termasuk perencanaan, pelaksanaan, dan pengawasan program serta kebijakan pemerintah daerah.</p>',
        fungsiutama: '<p>Koordinasi Urusan Pemerintahan: Mengkoordinasikan dan memantau pelaksanaan kebijakan dari pemerintah pusat, provinsi, dan kabupaten.</p>',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Tupoksis', Tupoksis, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tupoksis', null, {});
  }
};
