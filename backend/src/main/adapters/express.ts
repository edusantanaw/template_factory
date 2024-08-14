import { Request, Response } from "express";
import { IHttpResponse } from "../../shared/utils/httpResponse";

interface IController<In> {
  handler: (data: In) => Promise<IHttpResponse<unknown>>;
}

export default function expressAdapter<In>(controller: IController<In>) {
  return async (req: Request, res: Response) => {
    try {
      const { body, status } = await controller.handler({
        ...req.body,
        ...req.params,
        ...req.query,
      });
      return res.status(status).json(body);
    } catch (error) {
      // TODO - Create a error handler
      console.log(error);
      return res.status(500).send("Internal Server Error!");
    }
  };
}
