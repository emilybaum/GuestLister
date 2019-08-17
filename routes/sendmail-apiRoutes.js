require("dotenv").config();
// var express = require("express");
var Mailgun = require("mailgun-js");
// var app = express();

var db = require("../models");

module.exports = function(app) {
  var api_key = process.env.API_ID;
  var domain = process.env.DOMAIN;
  var from_who = process.env.EMAIL;

  // CHECKIN
  app.get("/api/guest/emailcheckin/:id", function(req, res) {
    console.log("started the mail for check in process");
    db.Guests.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(gus) {
      var first_name = gus.first_name;
      var email = gus.email;
      var thisEvent = gus.EventId;
      mailGunCheckIn(thisEvent, first_name, email);
    });
  });

  function mailGunCheckIn(event, guestName, guestEmail) {
    db.Events.findOne({
      where: {
        id: event
      }
    }).then(function(eve) {
      var checkInObj = {
        guestName: guestName,
        eventName: eve.name,
        question1: eve.question1,
        question2: eve.question2,
        question3: eve.question3,
        email: guestEmail
      };

      var mailgun = new Mailgun({ apiKey: api_key, domain: domain });

      var data = {
        from: from_who,
        to: checkInObj.email,
        subject: "You've been checked in, " + checkInObj.guestName + "!",
        html:
          "<H1>Welcome to " +
          checkInObj.eventName +
          ", " +
          checkInObj.guestName +
          "!</h1>" +
          "<h3>We are so glad you are here with us</h3>" +
          "<p>The organizer has put together a few quesitons for you to get started at this event. Here they are:</p>" +
          "<ol>" +
          "<li>" +
          checkInObj.question1 +
          "</li>" +
          "<li>" +
          checkInObj.question2 +
          "</li>" +
          "<li>" +
          checkInObj.question3 +
          "</li>" +
          "</ol>" +
          "<p>If you have any questions along the way, ask the people who checked your in.</p>" +
          "<p>Enjoy!</p>" +
          "<br>" +
          "<br>" +
          "<p><3 your friends at GuestLister</p>"
      };

      //Invokes the method to send emails given the above data with the helper library
      mailgun.messages().send(data, function(err, body) {
        //If there is an error, render the error page
        if (err) {
          res.render("error", { error: err });
          console.log("got an error: ", err);
        }
        //Else we can greet and leave
        else {
          console.log("sending mailgun messgae");
          console.log(body);
        }
      });
    });
  }

  // INVITATION
  app.get("/api/guest/invite/:mail/:event", function(req, res) {
    console.log("SENDING INVITE");
    var mailgun = new Mailgun({ apiKey: api_key, domain: domain });
    db.Events.findOne({
      where: {
        id: req.params.event
      }
    }).then(function(eve) {
      var eventObj = {
        name: eve.name,
        description: eve.description,
        start_time: eve.start_time,
        end_time: eve.end_time,
        date: eve.date,
        address_line: eve.address_line,
        city: eve.city,
        state: eve.state,
        zipcode: eve.zipcode
      };

      var data = {
        from: from_who,
        to: req.params.mail,
        subject: "Today is the best day because...",
        html:
          "<h1>You're scored yourself an invite!</h1>" +
          "<h3>Join us for " +
          eventObj.name +
          "</h3>" +
          "<p><strong>Details: </strong></p>" +
          "<ul>" +
          "<li><strong>Date: </strong>" +
          eventObj.date +
          "</li>" +
          "<li><strong>Location: </strong>" +
          eventObj.address_line +
          " " +
          eventObj.city +
          ", " +
          eventObj.state +
          " " +
          eventObj.zipcode +
          "</li>" +
          "<li><strong>From: </strong>" +
          eventObj.start_time +
          " to " +
          eventObj.end_time +
          "</li>" +
          "<ul>" +
          "<h3>See you there!</h3>" +
          "<br>" +
          "<br>" +
          "<p><3 your friends at GuestLister</p>"
      };

      mailgun.messages().send(data, function(err, body) {
        //If there is an error, render the error page
        if (err) {
          res.render("error", { error: err });
          console.log("got an error: ", err);
        }
        //Else we can greet and leave
        else {
          console.log("sending mailgun messgae");
          // this is where the page will be updated with an email being sent
          // res.render("handlebarspage....", { status: "invite sent" });
          console.log(body);
        }
      });
    });
  });
}; // end of export
