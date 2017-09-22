/*Codegen*/
import {Entity, Column, PrimaryColumn, ColumnOptions, Index, PrimaryGeneratedColumn} from "typeorm";
import "reflect-metadata";
  
@Entity()
export class hHero {
    @PrimaryColumn("int",{generated : true})
    public __id?:number;

    @Column()
    public __operation:string;

    @Column()
    public __userId:number;

    @Column("datetime")
    public __changeDate:Date;
 
    @Column()
    public id:number;
   
    @Column()
    public name:string;
  }
  