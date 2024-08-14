import { Created, IHttpResponse } from "../shared/utils/httpResponse";

interface ICreateService<In, Out> {
  create: (data: In) => Promise<Out>;
}

export class CreateController<In, Out> {
  constructor(protected service: ICreateService<In, Out>) {}
  public async handler(data: In): Promise<IHttpResponse<Out>> {
    const created = await this.service.create(data);
    return Created(created);
  }
}
