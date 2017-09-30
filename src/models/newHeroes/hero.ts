import {Entity, EmbeddableEntity, Embedded, Column, PrimaryColumn, Index} from "typeorm";
import {GenerateHistory, HistoryIndex, IgnoredInHistory} from "grunt-generate-history-model";
import {GenerateView, IgnoreViewModel, ViewModelName, ViewModelType} from "grunt-generate-view-model";
import { HeroDetail } from "./heroDetail";

@Entity()
@GenerateHistory()
@GenerateView("HeroViewModel")
export class Hero {

    @PrimaryColumn("int")
    @IgnoreViewModel()
    public id?: number;

    @Column("text")
    public name: string;

    @IgnoredInHistory()
    @Column("text")
    public data: string;

    @Column("int")
    @IgnoreViewModel()
    public detailId?: number;

    @ViewModelType("HeroDetail", "../../models/newHeroes/heroDetail")
    public detail: HeroDetail;

    @ViewModelType("HeroDetailViewModel", "./heroDetail")
    public detailVM: HeroDetail;

    @ViewModelType("HeroDetail", "../../models/newHeroes/heroDetail")
    public details: HeroDetail[];

    @ViewModelType("HeroDetailViewModel", "./heroDetail")
    public detailsVM: HeroDetail[];

    public simpleArray: number[];
}