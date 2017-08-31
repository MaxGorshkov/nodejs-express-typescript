import { resolveDependency } from "../../src/inversify.config";
import {IHeroService} from "../../src/services/heroes/heroService" ;

describe("HeroesService", () => {
    let service: IHeroService;

    beforeEach((done) => {
        this.service = resolveDependency<IHeroService>();
        done();
    });

  describe("HeroService.find", () => {
      it("it should return all heroes", (done) => {
          let res = this.service.find();
          res.should.be.a("array");
          res.length.should.be.above(0);
          done();
      });
  });

  describe("HeroService.get", () => {
    it("it should return first hero", (done) => {
        let res = this.service.get(2);
        res.should.be.a("object");
        res.should.be.deep.equal({ name: "second", id: 2 });
        done();
    });
});

});