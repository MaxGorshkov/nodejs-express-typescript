import { resolveDependency } from "../inversify.config";
import {Router, Request, Response, NextFunction} from "express";
import { IHeroService } from "../services/heroes/heroService";

class HeroRouting {

  private service: IHeroService = resolveDependency<IHeroService>();
  public router: Router = Router();

  constructor() {
    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      res.send(this.service.find());
    });

    this.router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
      res.send(this.service.get(+req.params.id));
    });
  }
}

export const heroRouter = (new HeroRouting()).router;
