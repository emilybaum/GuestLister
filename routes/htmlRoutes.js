var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Needs to be deleted after events gets linked back end
  app.get("/events", function(req, res) {
    db.Events.findAll({}).then(function(result) {
      res.render("events", {
        layout: "view",
        events: result
      });
    });
  });

  // This will work once the user and events are associated
  // app.get("/events/:id", function(req, res) {
  //   db.Events.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(result) {
  //     res.render("events", {
  //       layout: "view",
  //       event: result
  //     });
  //   });
  // });

  app.get("/guestlist/:eventid", function(req, res) {
    db.Guests.findAll({
      where: {
        EventId: req.params.eventid
      }
    }).then(function(dbGuest) {
      res.render("guestlist", {
        layout: "view",
        guests: dbGuest
      });
    });
  });

  // This is currently what /guestlist shows. Will need to look more like /event/:id when connected to backend.
  app.get("/event/:id", function(req, res) {
    db.Events.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.render("event", {
        event: result
      });
    });
  });

  app.get("/register", function(req, res) {
    res.render("register", {
      layout: "view"
    });
  });

  // Need?
  app.post("/eventpage", function(req, res) {
    var name = req.body.name;
    var pass = req.body.pass;
    if (name == "Admin" && pass == "123456") {
      res.json({ name: name, pass: pass });
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
