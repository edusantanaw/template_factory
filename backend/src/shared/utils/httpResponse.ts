function HttpStatus<T>(code: number, data: T) {
  return {
    status: code,
    body: data,
  };
}

const Created = <T>(body: T) => HttpStatus(201, body);

export { HttpStatus, Created };
