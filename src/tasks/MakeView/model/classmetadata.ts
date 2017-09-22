import {Entity, Column, Index, PrimaryColumn, EmbeddableEntity, ColumnOptions, TableInheritance, PrimaryGeneratedColumn} from "typeorm";
import "reflect-metadata";
import {FieldMetadata} from "./fieldmetadata";

export class ClassMetadata {
    public name: string;
    public fields: FieldMetadata[];
    public generateView: boolean = false;
}