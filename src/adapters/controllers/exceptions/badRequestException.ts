import { StatusCodes } from "http-status-codes";
import BaseException from "./baseException";

export default class BadRequestException extends BaseException {
  constructor(message: string,  data: any = {}) {
    super(StatusCodes.BAD_REQUEST, message, data);
  }
}
