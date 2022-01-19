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
    request.should.have.nested.property("address.pickup");
    request.should.have.nested.property("address.service");
    done();
  });

  it("should set the address.dropoff default to address.pickup when no value provided", function (done) {
    const mochAddress = "123 Some Test St";

    request = new Request({ address: { pickup: mochAddress } });
    request.should.have.nested.property("address.dropoff", mochAddress);
    done();
  });
});
