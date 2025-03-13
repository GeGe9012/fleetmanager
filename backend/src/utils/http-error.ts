export default class HttpError extends Error {
  statusCode: number;
  constructor(msg: string | undefined, statusCode = 500) {
    super(msg);
    this.statusCode = statusCode;
  }
}
