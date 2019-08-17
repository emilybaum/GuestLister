module.exports = function(sequelize, DataTypes) {
  var Guests = sequelize.define("Guests", {
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
    email: {
      type: DataTypes.STRING,
      len: [2],
      allowNull: false
      // validate: {
      //   isEmail: true, // checks for email format (foo@bar.com)
      // }
    },
    organization: {
      type: DataTypes.STRING
    },
    vip: {
      type: DataTypes.BOOLEAN
    },
    checked_in: {
      type: DataTypes.BOOLEAN
    }
  });

  Guests.associate = function(models) {
    Guests.belongsTo(models.Events, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Guests;
};
