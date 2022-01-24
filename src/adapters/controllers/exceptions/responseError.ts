import BaseException from "./baseException";

export default class ResponseError extends BaseException {
  public stack: any;
  public data: any;

  constructor(code: number, message: string, stack?: any, data?: any) {
    super(code, message);
    this.data = data;
    this.stack = stack;
  }
}
