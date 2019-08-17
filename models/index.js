"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";

// changed the config to be js vs json to work with JAWSDB
var config = require(__dirname + "/../config/config.js")[env];
var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Models/tables
db.Events = require('../models/eventsTable')(sequelize, Sequelize);
db.Admins = require('../models/adminsTable')(sequelize, Sequelize);
db.Guests = require('../models/guestsTable')(sequelize, Sequelize);

//Relations
// db.Admins.hasMany(db.Events);
// db.Events.belongsTo(db.Admins);
db.Events.hasMany(db.Guests);
db.Guests.belongsTo(db.Events);

module.exports = db;
