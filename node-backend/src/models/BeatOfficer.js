
'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const BeatOfficer = sequelize.define('BeatOfficer', {
    name: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    roleId: {
      type: DataTypes.INTEGER
    },
    beatOfficeId: {
      type: DataTypes.INTEGER
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

  BeatOfficer.associate = function(models) {
    BeatOfficer.hasOne(sequelize.define('Role'));
  };

  return BeatOfficer;
};