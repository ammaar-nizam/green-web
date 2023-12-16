
'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Admin = sequelize.define('Admin', {
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {sequelize});

  Admin.associate = function(models) {
    Admin.hasOne(sequelize.define('Role'));
  };

  Admin.sync();

  return Admin;
};