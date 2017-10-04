import {Entity, Column, PrimaryColumn, ColumnOptions, Index, PrimaryGeneratedColumn} from "typeorm";
import "reflect-metadata";
  
@Entity()
export class hHero {
    @PrimaryGeneratedColumn()
    public __id?: number;

    @Column()
    public __operation: string;

    @Column("date")
    public __changedate: Date;
    @Column()
    public name: string;
}
