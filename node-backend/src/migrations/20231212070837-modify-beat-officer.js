'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('BeatOfficers', 'beatOfficeId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'BeatOffices',
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('BeatOfficers', 'beatOfficeId');
  }
};
