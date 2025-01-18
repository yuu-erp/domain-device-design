import { LoggerPort } from "../../infra-base/logger/logger.port";

export class LoggerService implements LoggerPort {
  log(message: string, ...meta: unknown[]): void {
    console.log(`[LOG]: ${message}`, ...meta);
  }

  error(message: string, trace?: unknown, ...meta: unknown[]): void {
    console.error(`[ERROR]: ${message}`, trace, ...meta);
  }

  warn(message: string, ...meta: unknown[]): void {
    console.warn(`[WARN]: ${message}`, ...meta);
  }

  debug(message: string, ...meta: unknown[]): void {
    console.debug(`[DEBUG]: ${message}`, ...meta);
  }
}
