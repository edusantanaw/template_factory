import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { TemplateDbEntity } from "./template";

@Entity({ name: "key" })
export class ReplaceableKeyDbEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;
  @Column({ type: "text" })
  key!: string;
  @Column({ type: "text" })
  type!: string;
  @ManyToOne(() => TemplateDbEntity, (t) => t.replaceableKeys)
  template!: TemplateDbEntity;
}
