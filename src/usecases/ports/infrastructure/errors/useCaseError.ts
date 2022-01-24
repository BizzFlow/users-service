import { CoreBaseError, ErrorObject } from "..";

class UseCaseError extends CoreBaseError {
  constructor(errorObj: ErrorObject, data: any = {}) {
    super(errorObj, data);
  }
}

export { UseCaseError };
