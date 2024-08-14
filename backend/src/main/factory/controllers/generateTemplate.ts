import { GenerateController } from "../../../controller/generateTemplate";
import { generateTemplateServiceFactory } from "../services/generateTemplate";

export function generateTemplateControllerFactory() {
  return new GenerateController(generateTemplateServiceFactory());
}
