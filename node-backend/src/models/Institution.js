'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Institution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Model.Institution.hasMany(Model.BeatOffice, { foreignKey: 'institutionId' });
    }
  }
  Institution.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Institution',
  });
  return Institution;
};