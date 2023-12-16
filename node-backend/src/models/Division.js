
'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Division = sequelize.define('Division', {
    name: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {sequelize});

  Division.associate = function(models) {
    Division.hasMany(sequelize.define('BeatOffice'));
  };

  Division.sync();

  return Division;
};