module.exports = function(sequelize, DataTypes) {
  var Admins = sequelize.define("Admins", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      len: [2, 50],
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      len: [2, 50],
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true
      // validate: {

      //   min: 2,
      //   max: 100
      // }
    },
    email: {
      type: DataTypes.STRING,
      len: [2],
      allowNull: false,
      validate: {
        isEmail: true // checks for email format (foo@bar.com)
      }
    },
    username: {
      type: DataTypes.STRING,
      len: [2, 50],
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      len: [2],
      allowNull: false
    },
    photo: {
      // need to get reference to the file location of the image
      // look at assignment before burgers// WHAT IS THE DATA TYPE?
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  // Admins.associate = function(models) {
  //   Admins.hasMany(models.Events, {
  //     foreignKey: "id",
  //     onDelete: "cascade"
  //   });
  // };

  return Admins;
};
