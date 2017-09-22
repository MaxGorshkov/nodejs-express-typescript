import * as server from "../../src/app" ;

import {} from "mocha";

var chai = require("chai")
, chaiHttp = require("chai-http");

chai.use(chaiHttp);
let should = chai.should();

describe("Heroes", () => {
    beforeEach((done) => {
        // TODO: add your preparation before each test
        done();
    });

  describe("/GET heroes", () => {
      it("it should GET all heroes", (done) => {
        chai.request(server)
            .get("/heroes")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                res.body.length.should.be.above(0);
              done();
            });
      });
  });

  describe("/GET hero by id", () => {
    it("it should GET first hero", (done) => {
      chai.request(server)
          .get("/heroes/1")
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.be.deep.equal({ name: "first", id: 1 });
            done();
          });
    });
});

});