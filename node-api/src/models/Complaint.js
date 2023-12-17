'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Complaint = sequelize.define('Complaint', {
    description: {
        type: DataTypes.TEXT('long')
    },
    location: {
        type: DataTypes.TEXT('long')
    },
    location: {
      type: DataTypes.TEXT('long')
    },
    evidence: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM,
        values: ['NEW', 'IN PROGRESS', 'UNDER INVESTIGATION', 'RESOLVED', 'REJECTED']   
    },
    beatOfficerId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'BeatOffice',
            key: 'id'
        }
    },
    adminId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Admin',
            key: 'id'
        }
    },
    publicUserId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'PublicUser',
            key: 'id'
        }
    },
    beatOfficeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'BeatOffice',
          key: 'id'
        }
    }
  }, {sequelize});

  Complaint.associate = function(models) {
    Complaint.hasOne(sequelize.define('PublicUser'));
    Complaint.hasOne(sequelize.define('Admin'));
    Complaint.hasOne(sequelize.define('BeatOfficer'));
    Complaint.hasOne(sequelize.define('BeatOffice'));
  };

  return Complaint;
};