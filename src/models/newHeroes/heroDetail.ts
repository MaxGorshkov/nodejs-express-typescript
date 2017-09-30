import {Entity, EmbeddableEntity, Embedded, Column, PrimaryColumn} from "typeorm";
import {GenerateHistory, HistoryIndex, IgnoredInHistory} from "grunt-generate-history-model";
import {GenerateView, IgnoreViewModel, ViewModelName} from "grunt-generate-view-model";

@Entity()
@GenerateHistory()
@GenerateView("HeroDetailViewModel")
export class HeroDetail {

    @PrimaryColumn("int")
    @IgnoreViewModel()
    public id?: number;

    @Column("text")
    public detail: string;
}