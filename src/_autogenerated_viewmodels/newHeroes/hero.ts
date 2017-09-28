/*Codegen*/
import { HeroDetail} from "../../models/newHeroes/heroDetail";
import { HeroDetailViewModel} from "./heroDetail";

  
export class HeroViewModel {
    
  public name: string;
    
  public data: string;
      
  public detail: HeroDetail;
    
  public detailVM: HeroDetailViewModel;
    
  public details: HeroDetail [];
    
  public detailsVM: HeroDetailViewModel [];
    
  public simpleArray: number [];
  
  constructor(model: any) {
      
    this.name = model.name;
      
    this.data = model.data;
        
    this.detail = JSON.parse(JSON.stringify(model.detail));
      
    this.detailVM = new HeroDetailViewModel ( model.detailVM );
      
    this.details = model.details.map(function(item: any) {
      return JSON.parse(JSON.stringify(item));
    });

      
    this.detailsVM = model.detailsVM.map(function(item: any) {
      return new HeroDetailViewModel ( item );
    });

      
    this.simpleArray = model.simpleArray.map(function(item: any) {
      return JSON.parse(JSON.stringify(item));
    });

  }
}
