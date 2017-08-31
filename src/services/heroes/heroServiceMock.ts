import { Hero } from "../../models/heroes/hero";
import { IHeroService } from "./heroService";

export class HeroServiceMock implements IHeroService {
    public find(): Array<Hero> {
        return [
            {
                id: 0,
                name: "zero"
            }
        ];
    }

    public get(id: number): Hero {
        return {
                id: 0,
                name: "zero"
            };
    }

    public add(hero: Hero): Hero {
        hero.id = 1;
        return hero;
    }
}