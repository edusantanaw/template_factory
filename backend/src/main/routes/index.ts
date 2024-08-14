import { Router } from "express";
import expressAdapter from "../adapters/express";
import { createTemplateControllerFactory } from "../factory/controllers/createTemplate";

export default () => {
  const router = Router();
  router.post("/template", expressAdapter(createTemplateControllerFactory()));
  return router;
};
