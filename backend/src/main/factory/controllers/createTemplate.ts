import { CreateController } from "../../../controller/create";
import { createTemplateServiceFactory } from "../services/createTemplate";

export function createTemplateControllerFactory() {
  return new CreateController(createTemplateServiceFactory());
}
