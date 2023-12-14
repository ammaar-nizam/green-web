
'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const BeatOffice = sequelize.define('BeatOffice', {
    name: {
      type: DataTypes.STRING
    },
    branchId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Branches',
        key: 'id'
      }
    },
    divisionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Divisions',
        key: 'id'
      }
    },
    institutionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Institutions',
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

  BeatOffice.sync();

  return BeatOffice;
};