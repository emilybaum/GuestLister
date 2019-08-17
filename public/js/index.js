// import { doesNotReject } from "assert";

/* eslint-disable camelcase */
// Get references to page elements
var $eventName = $("#event-name");
var $eventDescription = $("#event-description");
var $eventType = $("#event-type");
var $startTime = $("#start-time");
var $endTime = $("#end-time");
var $date = $("#date");
var $addressLine = $("#event-address");
var $eventCity = $("#event-city");
var $eventState = $("#event-state");
var $eventZipcode = $("#event-zipcode");
var $questionOne = $("#question-one");
var $questionTwo = $("#question-two");
var $questionThree = $("#question-three");
var $submitEvent = $("#submitEvent");
var $eventList = $("#event-list");

// register user page elements
var $newUserFirstName = $("#newUserFirstName");
var $newUserLastName = $("#newUserLastName");
var $companyName = $("#companyName");
var $newUserEmail = $("#newUserEmail");
var $newUserUName = $("#newUserUName");
var $newUserPhoto = $("#newUserPhoto");
var $newUserPass = $("#newUserPass");
var $reNewUserPass = $("#reNewUserPass");
// register button
var $signup = $("#signup");
// user login button
var $signin = $("#signin");
var $userName = $("#userName");
var $userPass = $("#userPass");

// The API object contains methods for each kind of request we'll make
var API = {
  saveEvent: function(event) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/events",
      data: JSON.stringify(event)
    });
  },
  getEvent: function() {
    return $.ajax({
      url: "/api/events",
      type: "GET"
    });
  },
  deleteEvent: function(id) {
    return $.ajax({
      url: "/api/events/" + id,
      type: "DELETE"
    });
  },
  addUser: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/user",
      data: JSON.stringify(user)
    });
  },
  userLogin: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/user/login",
      data: JSON.stringify(user)
    });
  }
};

// refreshEvents gets new events from the db and repopulates the list
var refreshEvents = function() {
  API.getEvent().then(function() {
    location.reload();
  });
};

// refreshEvents();
// handleFormSubmit is called whenever we submit a new event
// Save the new event to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var event = {
    name: $eventName.val().trim(),
    description: $eventDescription.val().trim(),
    event_type: $eventType.val().trim(),
    start_time: $startTime.val().trim(),
    end_time: $endTime.val().trim(),
    date: $date.val().trim(),
    address_line: $addressLine.val().trim(),
    city: $eventCity.val().trim(),
    state: $eventState.val().trim(),
    zipcode: $eventZipcode.val().trim(),
    question1: $questionOne.val().trim(),
    question2: $questionTwo.val().trim(),
    question3: $questionThree.val().trim()
  };

  if (!(event.name && event.description)) {
    alert("You must enter event details!");
    return;
  }
  console.log(JSON.stringify(event));

  API.saveEvent(event).then(function() {
    refreshEvents();
  });

  $eventName.val("");
  $eventDescription.val("");
  $eventType.val("");
  $startTime.val("");
  $endTime.val("");
  $date.val("");
  $addressLine.val("");
  $eventCity.val("");
  $eventState.val("");
  $eventZipcode.val("");
  $questionOne.val("");
  $questionTwo.val("");
  $questionThree.val("");
};

// handleDeleteBtnClick is called when an event's delete button is clicked
// Remove the event detail from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteEvent(idToDelete).then(function() {
    refreshEvents();
  });
};

// Adds new user
var addNewUserSubmit = function() {
  event.preventDefault();

  var user = {
    first_name: $newUserFirstName.val().trim(),
    last_name: $newUserLastName.val().trim(),
    company: $companyName.val().trim(),
    email: $newUserEmail.val().trim(),
    username: $newUserUName.val().trim(),
    photo: $newUserPhoto.val().trim(),
    password: $newUserPass.val().trim()
  };
  var confirmPassword = $reNewUserPass.val().trim();

  if (user.password !== confirmPassword) {
    alert("Your passwords don't match, please try again");
    return;
  }

  API.addUser(user).then(function(result) {
    console.log(result.id)
    window.location.href = "/events/:" + result.id;
    if (result.errors[0].message === "Validation isEmail on email failed") {
      alert("Please enter a valid email address");
    } else {
      console.log(result.id)
      window.location.href = "/events/:" + result.id;
    }
  });
};

var adminLogin = function() {
  event.preventDefault();
  var user = {
    username: $userName.val().trim(),
    password: $userPass.val().trim()
  };
  API.userLogin(user).then(result => {
    window.location.href = "/events";
  });
};
// Add event listeners to the submit and delete buttons
$submitEvent.on("click", handleFormSubmit);
$signup.on("click", addNewUserSubmit);
$signin.on("click", adminLogin);
$eventList.on("click", ".delete", handleDeleteBtnClick);
