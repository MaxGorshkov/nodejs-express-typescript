import {Entity, Column, Index, PrimaryColumn, EmbeddableEntity, ColumnOptions, TableInheritance, PrimaryGeneratedColumn} from "typeorm";
import "reflect-metadata";

export class FieldMetadata {
    public name: string;
    public baseModelName: string;
    public type: string;
    public ignoredInView: boolean = false;
    public isArray: boolean = false;
    public isComplexObj: boolean = false;
}