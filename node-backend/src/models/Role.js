'use strict';
const {
  Model
} = require('sequelize');
const PublicUser = require('./PublicUser');
const Admin = require('./Admin');
const BeatOfficer = require('./BeatOfficer');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Role.init({
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};