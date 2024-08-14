import { randomUUID } from "node:crypto";
import { ReplaceableKeyEntity } from "./replaceableKey";

interface Data {
  name: string;
  path: string;
  replaceableKeys: ReplaceableKeyEntity[];
  id?: string;
}

export interface ITemplateEntity {
  id: string;
  name: string;
  path: string;
  replaceableKeys: ReplaceableKeyEntity[];
}

export class TemplateEntity {
  private id: string;
  private name: string;
  private path: string;
  private replaceableKeys: ReplaceableKeyEntity[];

  constructor(data: Data) {
    this.id = data?.id ?? randomUUID();
    this.name = data.name;
    this.path = data.path;
    this.replaceableKeys = data.replaceableKeys;
  }

  public get getTemplateEntity(): ITemplateEntity {
    return {
      id: this.id,
      name: this.name,
      path: this.path,
      replaceableKeys: this.replaceableKeys,
    };
  }
}
