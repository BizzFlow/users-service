/* istanbul ignore file */

export default interface Logger {
  /**
   * Log debug message
   * @param  {any} message
   * @param  {any} data?
   * @returns void
   */
  debug(message: any, data?: any): void;

  /**
   * Log info message
   * @param  {any} message
   * @param  {any} data?
   * @returns void
   */
  info(message: any, data?: any): void;

  /**
   * Log warning message
   * @param  {Error} error
   * @returns void
   */
  warning(error: Error): void;

  /**
   * Log error message
   * @param  {Error} error
   * @returns void
   */
  error(error: Error): void;

  /**
   * Log fatal error message
   * @param  {Error} error
   * @returns void
   */
  fatal(error: Error): void;
}
