require("dotenv").config();

var http = require("http");

var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("passport");
var session = require("express-session"),
  bodyParser = require("body-parser");
require("./config/passport")(passport);
// added this for mailgun testing - leave this hear for now (signed, Emily)
// var sendmail = require("./public/js/sendmail");
// sendmail();

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/guest-apiRoutes")(app);
require("./routes/apiRoutes")(app);
require("./routes/user-apiRoutes")(app);
require("./routes/sendmail-apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// have set this to TRUE so that the Sequelize will run during development (need to change back to FALSE later)
// var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// ADDED BY EMILY PER JORDANS RECOMMENDATION
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({ force: process.env.forceDBSync }).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
