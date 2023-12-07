'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Investigation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Investigation.init({
    complaintId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    evidence: DataTypes.STRING,
    officerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Investigation',
  });
  return Investigation;
};