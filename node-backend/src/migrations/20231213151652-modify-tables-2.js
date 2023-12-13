'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('BeatOffices', 'branchId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Branches',
        key: 'id'
      }
    });
    await queryInterface.changeColumn('BeatOffices', 'divisionId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Divisions',
        key: 'id'
      }
    });
    await queryInterface.changeColumn('BeatOffices', 'institutionId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Institutions',
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
