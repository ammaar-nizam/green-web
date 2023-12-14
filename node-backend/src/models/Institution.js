
'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Institution = sequelize.define('Institution', {
    name: {
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

  Institution.associate = function(models) {
    Institution.hasMany(sequelize.define('BeatOffice'));
  };

  Institution.sync();

  return Institution;
};