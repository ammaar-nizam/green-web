'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BeatOffice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BeatOffice.init({
    name: DataTypes.STRING,
    branchId: DataTypes.INTEGER,
    divisionId: DataTypes.INTEGER,
    institutionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BeatOffice',
  });
  return BeatOffice;
};