
'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Branch = sequelize.define('Branch', {
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

  Branch.associate = function(models) {
    Branch.hasMany(sequelize.define('BeatOffice'));
  };

  Branch.sync();

  return Branch;
};