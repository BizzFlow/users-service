import { StatusCodes } from "http-status-codes";
import BaseException from "./baseException";

export default class MappingException extends BaseException {
  constructor(message: string,  data: any = {}) {
    super(StatusCodes.BAD_REQUEST, message, data);
  }
}
