import { TemplateRepository } from "../../../infra/repository/template";
import { GenerateTemplateService } from "../../../services/template/generateTemplate";
import { ZipService } from "../../../shared/zip";
import { AppDataSource } from "../../config/typeorm";

export function generateTemplateServiceFactory() {
  const repository = new TemplateRepository(AppDataSource);
  const zipService = new ZipService();
  return new GenerateTemplateService(repository, zipService);
}
