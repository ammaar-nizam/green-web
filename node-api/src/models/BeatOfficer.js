
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
      type: DataTypes.INTEGER,
      references: {
        model: 'Role',
        key: 'id'
      }
    },
    beatOfficeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'BeatOffice',
        key: 'id'
      }
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
    BeatOfficer.hasOne(sequelize.define('BeatOffice'));
  };

  return BeatOfficer;
};