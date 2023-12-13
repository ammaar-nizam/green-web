'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Complaint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Complaint.init({
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    category: DataTypes.INTEGER,
    status: DataTypes.STRING,
    dateCreated: DataTypes.DATE,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Complaint',
  });
  return Complaint;
};