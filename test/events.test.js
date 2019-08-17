var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/events", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all events", function(done) {
    // Add some examples to the db to test with
    db.Events.bulkCreate([
      {
        name: "First Event",
        description: "First Description",
        start_time: "3:00",
        end_time: "5:00",
        date: "03/15/2020",
        address_line: "460 W 34th St",
        city: "New York",
        state: "NY",
        zipcode: "10001"
      },
      { name: "Second Event",
      description: "Second Description",
      start_time: "4:00",
      end_time: "6:00",
      date: "05/15/2020",
      address_line: "460 W 34th Street",
      city: "New York",
      state: "NY",
      zipcode: "10001" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/events").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            name: "First Event",
            description: "First Description"
          });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            name: "Second Event",
            description: "Second Description"
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
