import {Router, Request, Response, NextFunction} from "express";

class Index {
  constructor(public router: Router) {
    this.router.get("/", this.get);
  }

  private get(req: Request, res: Response, next: NextFunction) {
    res.render("index", { title: "Express" });
  }
}

export const indexRouter = (new Index(Router())).router;