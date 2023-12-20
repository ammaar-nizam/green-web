'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Notification = sequelize.define('Notification', {
    publicUserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'PublicUser',
        key: 'id'
      }
    },
    message: {
      type: DataTypes.TEXT
    },
    date: {
        type: DataTypes.DATE
    },
    time: {
      type: DataTypes.TIME
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

  Notification.associate = function(models) {
    Notification.hasOne(sequelize.define('PublicUser'));
  };

  return Notification;
};