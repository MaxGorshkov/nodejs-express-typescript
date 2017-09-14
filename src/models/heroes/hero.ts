import {Entity, EmbeddableEntity, Embedded, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Hero {
    @PrimaryColumn("int", { "generated": true })
    public id?: number;
    @Column("text")
    public name: string;
}