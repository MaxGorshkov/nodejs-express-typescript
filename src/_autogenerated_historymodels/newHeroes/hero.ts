/*Codegen*/
import {Entity, Column, PrimaryColumn, ColumnOptions, Index, PrimaryGeneratedColumn} from "typeorm";
import "reflect-metadata";
  
@Entity()
export class hHero {
    @PrimaryColumn("int")
    public __id?:number;

    @Column()
    public __operation:string;

    @Column()
    public __userId:number;

    @Column("datetime")
    public __changeDate:Date;
  
    @Column()
    public name:string;
    
    @Column()
    public detailId:number;
       }
  