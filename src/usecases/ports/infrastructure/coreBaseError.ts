enum ErrorSeverity {
  FATAL = 'fatal',
  ERROR = 'error',
  WARNING = 'warning',
}

interface ErrorObject {
  code: string;
  message: string;
  diagnostics?: string;
  severity: ErrorSeverity;
  source: string;
  error: Error;
}

abstract class CoreBaseError extends Error {
  public stack: any;
  public reason: string;
  public source: string;
  public data: any;
  public code: string;
  public diagnostics?: string;
  public severity: ErrorSeverity;

  constructor(errorObj: ErrorObject, data: any = {}) {
    super(errorObj.message);

    this.code = errorObj.code;
    this.diagnostics = errorObj.diagnostics;
    this.severity = errorObj.severity;
    this.source = errorObj.source;
    this.data = data;
    this.reason = errorObj.error.message;
    this.stack = errorObj.error.stack;
  }
}

export { ErrorSeverity, ErrorObject, CoreBaseError };
