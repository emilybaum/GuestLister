var db = require("../models");

module.exports = function(app) {
  // Get all events with details for that particular admin
  app.get("/api/events", function(req, res) {
    db.Events.findAll({}).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // Create a new event
  app.post("/api/events", function(req, res) {
    console.log("event added");
    db.Events.create(req.body).then(function(req) {
      res.json(req);
    });
  });

  // Update event details.
  app.put("/api/events", function(req, res) {
    console.log("event updated");
    console.log(req);
    var startTime = req.data.start_time;
    var endTime = req.data.end_time;
    var date = req.data.date;

    db.Events.update(
      {
        name: req.body.name,
        description: req.body.description,
        event_type: req.body.event_type,
        start_time: startTime,
        end_time: endTime,
        date: date,
        address_line: req.body.address_line,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        question1: req.body.question1,
        question2: req.body.question2,
        question3: req.body.question3
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // Delete an event by id
  app.delete("/api/events/:id", function(req, res) {
    db.Events.destroy({ where: { id: req.params.id } }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });
};
