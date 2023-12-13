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
      // Model.Institution.hasMany(Model.BeatOffice, { foreignKey: 'institutionId' });
      // Model.Branch.hasMany(Model.BeatOffice, { foreignKey: 'branchId' });
      // Model.Division.hasMany(Model.BeatOffice, { foreignKey: 'divisionId' });

      // Model.BeatOffice.belongsTo(Model.Branch, { foreignKey: 'branchId' });
      // Model.BeatOffice.belongsTo(Model.Division, { foreignKey: 'divisionId' });
      // Model.BeatOffice.belongsTo(Model.Institution, { foreignKey: 'institutionId' });
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