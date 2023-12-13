'use strict';
const {
  Model
} = require('sequelize');
const Role = require('./Role');
module.exports = (sequelize, DataTypes) => {
  class BeatOfficer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  BeatOfficer.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    beatOfficeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BeatOfficer',
  });
  return BeatOfficer;
};