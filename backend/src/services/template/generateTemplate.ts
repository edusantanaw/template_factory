import fs, { mkdir } from "node:fs";
import { ZipService } from "./../../shared/zip/index";
import { ITemplateEntity } from "../../entities";
import { randomUUID } from "node:crypto";

type IKeyWithValue = {
  key: string;
  value: string;
};

interface Data {
  templateId: string;
  keysWithValue: IKeyWithValue[];
}

interface ILoadByIdRepository<T> {
  loadById: (id: string) => Promise<T | null>;
}

export class GenerateTemplateService {
  private path = "./public/generated";
  private output = "./public/zip";

  constructor(
    protected repository: ILoadByIdRepository<ITemplateEntity>,
    protected zipService: ZipService
  ) {
    const existsPath = fs.existsSync(this.path);
    if (!existsPath) fs.mkdirSync(this.path);
    const existsOutput = fs.existsSync(this.output);
    if (!existsOutput) fs.mkdirSync(this.output);
  }

  public async generate(data: Data) {
    const template = await this.repository.loadById(data.templateId);
    if (!template) throw new Error("Template não encontrado!");
    const dir = randomUUID();
    const path = await this.buildTemplate(template, data.keysWithValue, dir);
    const zipTemplate = await this.templateToZip(path, `${this.output}/${dir}.zip`);
    return zipTemplate;
  }

  private async templateToZip(path: string, output: string) {
    console.log(path);
    await this.zipService.createZip(path, output);
    const template = fs.readFileSync(output);
    return template.toString("base64");
  }

  private async buildTemplate(
    template: ITemplateEntity,
    keysWithValue: IKeyWithValue[],
    dir: string
  ) {
    const path = `${this.path}/${dir}`;
    fs.mkdirSync(path);
    for await (const item of this.zipService.readZip(template.path)) {
      if (item.isDirectory) {
        fs.mkdirSync(`${path}/${item.entryName}`);
        continue;
      }
      const fileData = item.getData().toString();
      const file = this.replaceFileKeys(keysWithValue, fileData);
      fs.writeFileSync(`${path}/${item.entryName}`, file);
    }
    return path;
  }

  private replaceFileKeys(keysWithValue: IKeyWithValue[], file: string) {
    let response = file;
    keysWithValue.forEach((e) => {
      response = response.replace(e.key, e.value);
    });
    return response;
  }
}
