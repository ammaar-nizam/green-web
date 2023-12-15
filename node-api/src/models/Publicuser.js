
'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const PublicUser = sequelize.define('PublicUser', {
    name: {
      type: DataTypes.STRING
    },
    nic: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    mobile: {
      type: DataTypes.INTEGER
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {sequelize});

  PublicUser.associate = function(models) {
    PublicUser.hasOne(sequelize.define('Role'));
  };

  return PublicUser;
};