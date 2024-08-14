import { Router } from "express";
import expressAdapter from "../adapters/express";
import { createTemplateControllerFactory } from "../factory/controllers/createTemplate";
import { generateTemplateControllerFactory } from "../factory/controllers/generateTemplate";

export default () => {
  const router = Router();
  router.post("/template", expressAdapter(createTemplateControllerFactory()));
  router.post(
    "/template/generate/:templateId",
    expressAdapter(generateTemplateControllerFactory())
  );
  return router;
};
