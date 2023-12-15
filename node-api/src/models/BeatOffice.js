
'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const BeatOffice = sequelize.define('BeatOffice', {
    name: {
      type: DataTypes.STRING
    },
    branchId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Branch',
        key: 'id'
      }
    },
    divisionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Division',
        key: 'id'
      }
    },
    institutionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Institution',
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

  BeatOffice.associate = function(models) {
    BeatOffice.hasOne(sequelize.define('Branch'));
    BeatOffice.hasOne(sequelize.define('Division'));
    BeatOffice.hasOne(sequelize.define('Institution'));
  };

  return BeatOffice;
};