import {Entity, EmbeddableEntity, Embedded, Column, PrimaryColumn} from "typeorm";
import {GenerateHistory, HistoryIndex} from "grunt-generate-history-model";
import {GenerateView, IgnoreViewModel, ViewModelName} from "grunt-generate-view-model";

@Entity()
@GenerateHistory()
@GenerateView("HeroViewModel")
export class Hero {
    @PrimaryColumn("int")
    @IgnoreViewModel()
    public id?: number;
    @Column("text")
    public name: string;
}