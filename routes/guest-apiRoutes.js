// fill this in with the route to access the guests names for events
var db = require("../models");

module.exports = function(app) {
  // app.get("/api/guestlist/:eventid", function(req, res) {
  //   db.Guests.findAll({
  //     where: {
  //       EventId: req.params.eventid
  //     }
  //   }).then(function(dbGuest) {
  //     res.json(dbGuest);
  //   });
  // });

  // working on this one
  app.post("/guestlist/api/guests/add", function(req, res) {
    console.log("ADDING NEW GUEST");
    // need to pass the EventId
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var email = req.body.email;
    var org = req.body.org;
    var vip = req.body.vip;
    var EventId = req.body.EventId;

    console.log(req.body);

    db.Guests.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      organization: org,
      vip: vip,
      EventId: EventId
    }).then(function(dbGuest) {
      res.json(dbGuest);
    });
  });

  app.put("/api/guests", function(req, res) {
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var email = req.body.email;
    var org = req.body.organization;
    var vip = req.body.vip;
    var checked_in = req.body.checked_in;
    // will be happening on a differnet api call

    db.Guests.update(
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        organization: org,
        vip: vip
      },
      {
        wjere: {
          id: req.body.id
        }
      }
    ).then(function(dbGuest) {
      res.json(dbGuest);
    });
  });

  // GUEST CHECK IN PROCESS
  // check in
  app.post("/api/guest/checkin/:id", function(req, res) {
    db.Guests.update(
      {
        checked_in: true
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function(dbGuest) {
      res.json(dbGuest);
    });
  });

  // uncheck in
  app.post("/api/guest/uncheckin/:id", function(req, res) {
    db.Guests.update(
      {
        checked_in: false
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function(dbGuest) {
      res.json(dbGuest);
    });
  });

  //   MAILGUN PROCESS -----------------------
  //   See the sendmail-apiRoutes.js file
  //   ---------------------------------------

  // Delete a guest by id
  app.delete("/api/guests/:id", function(req, res) {
    db.Guests.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbGuest) {
      //   TRIGGER EMAIL TO BE SENT TO THE GUEST STATING THAT THEY HAVE BEEN REMOVED
      res.json(dbGuest);
    });
  });
};
