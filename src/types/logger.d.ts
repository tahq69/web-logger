import { LogType } from "./types";

export interface Logger {
  /**
   * Write log message.
   *
   * @param {...any[]} args
   * @memberof Logger
   */
  log(...args: any[]): void;

  /**
   * Write warning message.
   *
   * @param {...any[]} args
   * @memberof Logger
   */
  warn(...args: any[]): void;

  /**
   * Write informational message.
   *
   * @param {...any[]} args
   * @memberof Logger
   */
  info(...args: any[]): void;

  /**
   * Write error message.
   *
   * @param {...any[]} args
   * @memberof Logger
   */
  error(...args: any[]): void;

  /**
   * Group logs to section and get logger method.
   *
   * @param {string} section
   * @param {LogType} [type]
   * @returns {(...args: any[]) => void}
   * @memberof Logger
   */
  group(section: string, type?: LogType): (...args: any[]) => void;
}
