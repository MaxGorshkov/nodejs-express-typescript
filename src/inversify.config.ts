import { Container } from "inversify";
import { IHeroService, HeroService } from "./services/heroes/heroService";
import { HeroServiceMock } from "./services/heroes/heroServiceMock";

var appContainer = new Container();

{// IHeroService
    appContainer.bind<IHeroService>("test").toConstantValue(new HeroService());
    appContainer.bind<IHeroService>("development").toConstantValue(new HeroServiceMock());
    appContainer.bind<IHeroService>("production").toConstantValue(new HeroService());
}

var resolveDependency = function<T>(){
    return appContainer.get<T>(process.env.NODE_ENV);
};

export { resolveDependency };