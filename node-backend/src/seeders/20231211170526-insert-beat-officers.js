'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('BeatOfficers', [
      {
        name: "Anthony Martial",
        username: "anthony",
        email: "anthony@gmail.com",
        password: "anthony@123",
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Marcus Rashford",
        username: "marcus",
        email: "marcus@gmail.com",
        password: "marcus@123",
        roleId: 3,
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
