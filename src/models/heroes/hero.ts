import {Entity, EmbeddableEntity, Embedded, Column, PrimaryColumn} from "typeorm";
import {GenerateHistory, HistoryIndex} from "../../../src/tasks/makeHistory/model/historyDecorator";
import {GenerateView, IgnoreViewModel, ViewModelName} from "../../../src/tasks/makeView/model/viewDecorators";

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