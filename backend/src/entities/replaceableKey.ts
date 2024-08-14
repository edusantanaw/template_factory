import { randomUUID } from "node:crypto";

export type IReplaceableKeyEntity = {
  type: string;
  key: string;
  id: string;
};

export interface IReplaceableKeyData {
  id?: string;
  type: "file" | "text";
  key: string;
}

type KeyType = "file" | "text";

export class ReplaceableKeyEntity {
  private id: string;
  private type: KeyType;
  private key: string;

  constructor(data: IReplaceableKeyData) {
    this.id = data?.id ?? randomUUID();
    this.type = data.type;
    this.key = data.key;
  }

  public get getRplaceableKeyEntity(): IReplaceableKeyEntity {
    return {
      id: this.id,
      type: this.type,
      key: this.key,
    };
  }
}
