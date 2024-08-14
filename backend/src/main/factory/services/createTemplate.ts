import { TemplateRepository } from "../../../infra/repository/template";
import { CreateTemplateService } from "../../../services/template/createTemplate";
import { AppDataSource } from "../../config/typeorm";

export function createTemplateServiceFactory() {
  const repository = new TemplateRepository(AppDataSource);
  return new CreateTemplateService(repository);
}
