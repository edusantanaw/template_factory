import { ZipService } from "./../../shared/zip/index";
import { ITemplateEntity } from "../../entities";

interface Data {
  templateId: string;
  keysWithValue: {
    key: string;
    value: string;
  }[];
}

interface ILoadByIdRepository<T> {
  loadById: (id: string) => Promise<T | null>;
}

export class GenerateTemplateService {
  constructor(
    protected repository: ILoadByIdRepository<ITemplateEntity>,
    protected zipService: ZipService
  ) {}

  public async generate(data: Data) {
    const template = await this.repository.loadById(data.templateId);
    if (!template) throw new Error("Template não encontrado!");
    await this.zipService.readZip(template.path);
  }
}
