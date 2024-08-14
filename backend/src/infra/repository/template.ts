import { DataSource, Repository } from "typeorm";
import { TemplateDbEntity } from "../entities";
import { ITemplateEntity } from "../../entities";

export class TemplateRepository {
  private repository: Repository<TemplateDbEntity>;
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(TemplateDbEntity);
  }

  public async create(data: ITemplateEntity): Promise<ITemplateEntity> {
    const template = this.repository.create(data);
    const created = await this.repository.save(template);
    return created;
  }

  public async findAll() {
    const templates = await this.repository.find({
      relations: {
        replaceableKeys: true,
      },
    });
    return templates;
  }

  public async loadById(id: string) {
    const template = await this.repository.findOne({
      where: {
        id,
      },
    });
    return template;
  }
}
