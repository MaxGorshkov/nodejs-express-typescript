import {Entity, EmbeddableEntity, Embedded, Column, PrimaryColumn} from "typeorm";
import {GenerateHistory, HistoryIndex, IgnoredInHistory} from "../../../src/tasks/makeHistory/model/historyDecorator";
import {GenerateView, IgnoreViewModel, ViewModelName} from "../../../src/tasks/makeView/model/viewDecorators";

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