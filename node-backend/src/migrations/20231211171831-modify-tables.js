'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('PublicUsers', 'roleId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Roles',
        key: 'id'
      }
    });
    await queryInterface.changeColumn('Admins', 'roleId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Roles',
        key: 'id'
      }
    });
    await queryInterface.changeColumn('BeatOfficers', 'roleId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Roles',
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('PublicUsers', 'roleId');
    await queryInterface.removeColumn('Admin', 'roleId');
    await queryInterface.removeColumn('BeatOfficers', 'roleId');
  }
};
