export type IHttpResponse<T> = {
  status: number;
  body: T;
};

function HttpStatus<T>(code: number, data: T): IHttpResponse<T> {
  return {
    status: code,
    body: data,
  };
}

const Created = <T>(body: T) => HttpStatus(201, body);
const Ok = <T>(body: T) => HttpStatus(200, body);

export { HttpStatus, Created, Ok };
