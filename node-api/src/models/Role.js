
'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Role = sequelize.define('Role', {
    role: {
      type: DataTypes.STRING,
      allowNull: false
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

  Role.associate = function(models) {
    Role.hasMany(sequelize.define('Admin'));
    Role.hasMany(sequelize.define('BeatOfficer'));
    Role.hasMany(sequelize.define('PublicUser'));
  };

  return Role;
};