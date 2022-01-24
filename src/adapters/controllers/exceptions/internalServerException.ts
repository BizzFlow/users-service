import { StatusCodes } from "http-status-codes";
import BaseException from "./baseException";

export default class InternalServerException extends BaseException {
  constructor(message: string,  data: any = {}) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message, data);
  }
}
