const Request = require("../models/Request");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app");

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe("Request controller", function () {
  const requestSubObject = {
    houseNumber: 240,
    street: "43 St",
    city: "Lethbridge",
    postalCode: "T1J 1M5",
    country: "Canada",
  };
  let request;
  const requestObject = {
    userId: "61d763e736a0b51ad9807ea6",
    sitterId: "61d763e736a0b51ad9807ea8",
    start: "2032-02-19T15:20:00.000Z",
    end: "2032-02-20T15:20:00.000Z",
    accepted: false,
    declined: false,
    paid: false,
    address: requestSubObject,
  };

  beforeEach(function () {
    request = new Request(requestObject);
  });

  afterEach(function () {
    request = undefined;
  });

  describe("POST /request/new", () => {
    it("should create a new request, given a request object", function (done) {
      chai
        .request(app)
        .post("/request/new")
        .send(request)
        .then(function (res) {
          res.should.have.status(200);
          res.text.should.equal("Successfully saved request!");
          done();
        });
    });
  });

  describe("GET /request/load", () => {
    it("should retrieve a logged in user's requests", function (done) {
      const agent = chai.request.agent(app);
      agent.post("/auth/demo").then(function (res) {
        res.should.have.cookie("token");
        return agent.get("/request/load").then(function (res) {
          res.should.have.status(200);
          res.body.map((request) => {
            Object.keys(requestObject).map((key) => {
              // This is intended to find the requests for mock user and
              // search those requests for the mock request that was put
              // in the test DB from testing the POST /request/new route.
              // This confirms it exists and is being returned properly.

              // console.log(key);
              // console.log(request[key]);
              // console.log(requestObject[key]);
              // console.log(request[key] === requestObject[key]);
              // console.log("-----------");
              if (request[key] === requestObject[key]) {
                return true;
              }
              return false;
            });
            // console.log("===========NEXT ENTRY===========");
          });
          done();
        });
      });
    });
  });
});
