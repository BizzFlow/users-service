export default abstract class BaseException extends Error {
  public data: any;

  constructor(public code: number, message: string,  data: any = {}) {
    super(message);
    this.data = data;
  }
}
