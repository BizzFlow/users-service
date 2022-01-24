import winston from 'winston';

import { Logger } from "../../usecases/ports/infrastructure";

/**
 * Logger implementation for the Web application, using Winston framework
 */
export default class WebAppLogger implements Logger {
	public logger: any;

	constructor() {
		this.logger = winston.createLogger({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json()),
			transports: [
				new winston.transports.Console()
			]
		});
	}

	debug(message: any, _data?: any): void {
		this.logger.info(message);
	}

	info(message: any, _data?: any): void {
		this.logger.info(message);
	}

	warning(error: Error): void {
		this.logger.warn(error.message, error);
	}

	error(error: Error): void {
		this.logger.error(error.message, error);
	}

	fatal(error: Error): void {
		this.logger.error(error.message, error);
	}
}
