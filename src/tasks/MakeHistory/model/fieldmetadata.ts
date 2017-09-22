import {Entity, Column, Index, PrimaryColumn, EmbeddableEntity, ColumnOptions, TableInheritance, PrimaryGeneratedColumn} from "typeorm";
import "reflect-metadata";

export class FieldMetadata {
    public name: string;
    public type: string;
    public generateIndex: boolean = false;
    public ignoredInHistory: boolean = false;
    public isArray: boolean = false;
}