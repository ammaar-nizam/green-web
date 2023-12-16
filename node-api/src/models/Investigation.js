'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Investigation = sequelize.define('Investigation', {
    complaintId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Complaint',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT('long')
    },
    evidence: {
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

  Investigation.associate = function(models) {
    Investigation.hasOne(sequelize.define('Complaint'));
  };

  return Investigation;
};