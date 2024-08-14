import { GenerateTemplateService } from "../services/template/generateTemplate";
import { Created, IHttpResponse, Ok } from "../shared/utils/httpResponse";

type Data = {
  templateId: string;
  keysWithValue: {
    key: string;
    value: string;
  }[];
};

export class GenerateController {
  constructor(protected service: GenerateTemplateService) {}
  public async handler(data: Data): Promise<IHttpResponse<string>> {
    const ziped = await this.service.generate(data);
    return Ok(ziped);
  }
}
