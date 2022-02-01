const Request = require("../models/Request");
const chai = require("chai");

describe("Request model", function () {
  let request;

  beforeEach(function () {
    chai.should();
    request = new Request();
    request.address = {};
  });

  afterEach(function () {
    request = undefined;
  });

  it("should create a new Request object", function (done) {
    request.should.have.property("address");
    request.should.have.nested.property("address.houseNumber");
    request.should.have.nested.property("address.street");
    request.should.have.nested.property("address.district");
    request.should.have.nested.property("address.city");
    request.should.have.nested.property("address.county");
    request.should.have.nested.property("address.postalCode");
    request.should.have.nested.property("address.country");
    done();
  });

  it("should return an error when an invalid Canadian postal code is used", function (done) {
    const altRequest = new Request({
      userId: "61d763e736a0b51ad9807ea6",
      sitterId: "61d763e736a0b51ad9807ea7",
      start: "2032-02-19T15:20:00.000Z",
      end: "2032-02-20T15:20:00.000Z",
      accepted: "false",
      declined: "false",
      paid: "false",
      address: {
        houseNumber: 240,
        street: "43 St",
        city: "Lethbridge",
        postalCode: "Z0J 1M5",
        country: "Canada",
      },
    });

    altRequest.save((err) => {
      if (err.message.includes("Z0J 1M5 is not a valid postal code.")) {
        return done();
      }
    });
  });
});
