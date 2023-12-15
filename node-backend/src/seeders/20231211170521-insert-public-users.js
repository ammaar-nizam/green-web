'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PublicUsers', [
      {
        name: "Ammaar Nizam",
        nic: "200028504142",
        username: "ammaar",
        email: "ammaarnizam31@gmail.com",
        mobile: "0754940934",
        password: "ammaar@123",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tharisha Perera",
        nic: "200042412850",
        username: "tharisha",
        email: "tharisha.perera@gmail.com",
        mobile: "0712345678",
        password: "tharisha@123",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Istina Suresh",
        nic: "200050284241",
        username: "istina",
        email: "istina007@gmail.com",
        mobile: "0721731383",
        password: "istina@123",
        roleId: 1,
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
