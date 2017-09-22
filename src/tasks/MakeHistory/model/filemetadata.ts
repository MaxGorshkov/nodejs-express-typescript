import {Entity, Column, Index, PrimaryColumn, EmbeddableEntity, ColumnOptions, TableInheritance, PrimaryGeneratedColumn} from "typeorm";
import "reflect-metadata";
import {ClassMetadata} from "./classmetadata";

export class FileMetadata {
    public filename: string;
    public classes: ClassMetadata[];
}