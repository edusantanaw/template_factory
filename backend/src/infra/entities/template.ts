import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  type EntitySchema,
} from "typeorm";
import { ITemplateEntity } from "../../entities/template";
import { ReplaceableKeyDbEntity } from "./replaceableKey";

@Entity({ name: "template" })
export class TemplateDbEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;
  @Column({ type: "text" })
  name!: string;
  @Column({ type: "text" })
  path!: string;
  @OneToMany(() => ReplaceableKeyDbEntity, (key) => key.template)
  replaceableKeys!: ReplaceableKeyDbEntity[];
}
