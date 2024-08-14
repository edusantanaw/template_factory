import { randomUUID } from "node:crypto";
import fs from "node:fs";
import {
  IReplaceableKeyData,
  ReplaceableKeyEntity,
} from "../../entities/replaceableKey";
import { ITemplateEntity, TemplateEntity } from "../../entities/template";

type IData = {
  name: string;
  templateBase64: string;
  replaceableKeys: IReplaceableKeyData[];
};

interface CreateRepository<T> {
  create: (data: T) => Promise<T>;
}

export class CreateTemplateService {
  private path: string = "./public/templates";

  constructor(protected repository: CreateRepository<ITemplateEntity>) {
    const existsPath = fs.existsSync(this.path);
    if (!existsPath) fs.mkdirSync(this.path);
  }

  public async create(data: IData) {
    const keys = data.replaceableKeys.map(
      (e) => new ReplaceableKeyEntity(e).getRplaceableKeyEntity
    );
    const path = `${this.path}/${randomUUID()}.zip`;
    const template = new TemplateEntity({
      name: data.name,
      path: path,
      replaceableKeys: keys,
    });
    await this.createFile(path, data.templateBase64);
    const createdTemplate = await this.repository.create(
      template.getTemplateEntity
    );

    return createdTemplate;
  }

  private async createFile(path: string, base64: string) {
    await new Promise((resolve, reject) => {
      fs.mkdir(path, base64, (err) => {
        if (err) reject(err);
        else resolve(null);
      });
    });
  }
}
