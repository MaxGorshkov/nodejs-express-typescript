import {Entity, Column, Index, PrimaryColumn, EmbeddableEntity, ColumnOptions, TableInheritance, PrimaryGeneratedColumn} from "typeorm";
import "reflect-metadata";

export class FieldMetadata {
    public name: string;
    public type: string;
    public baseModelName: string;
    public baseModelType: string;
    public ignoredInView: boolean = false;
    public isArray: boolean = false;
    public isComplexObj: boolean = false;
}