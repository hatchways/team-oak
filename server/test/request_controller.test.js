const Request = require("../models/Request");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app");

chai.use(chaiHttp);
chai.should();

describe("Request controller", function () {
  let request;

  beforeEach(function () {
    request = new Request({
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
        postalCode: "T1J 1M5",
        country: "Canada",
      },
    });
  });

  afterEach(function () {
    request = undefined;
  });

  describe("GET /request/load", () => {
    it("should retrieve a logged in user's requests", function (done) {
      const agent = chai.request.agent(app);
      agent.post("/auth/demo").then(function (res) {
        res.should.have.cookie("token");
        return agent.get("/request/load").then(function (res) {
          res.should.have.status(200);
          res;
          done();
        });
      });

      // chai.request('http://localhost:3001')
      //   .get('/request/load')
      //   .end((err, res) => {
      //     res.should.have.status(200);
      //     res.body.should.be.json;
      //     done();
      //   });
    });
  });
});
