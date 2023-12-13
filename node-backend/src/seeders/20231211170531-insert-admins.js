'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admins', [
      {
        name: "Tony Stark",
        username: "tony",
        email: "tony.stark@gmail.com",
        password: "tony@123",
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
