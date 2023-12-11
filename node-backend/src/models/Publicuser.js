'use strict';
const {
  Model
} = require('sequelize');
const Role = require('./Role');
module.exports = (sequelize, DataTypes) => {
  class PublicUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  PublicUser.init({
    name: DataTypes.STRING,
    nic: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PublicUser',
  });
  return PublicUser;
};