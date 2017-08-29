import {Router, Request, Response, NextFunction} from "express";

const heroes = [{name: "first", id: 1},
{name: "second", id: 2}];

class Hero {
  constructor(public router: Router) {
    this.router.get("/", this.get);
  }

  private get(req: Request, res: Response, next: NextFunction) {
    res.send(heroes);
  }
}

export const heroRouter = (new Hero(Router())).router;
