import { isInArray } from "./utils";
import { WebConsoleWriter } from "./web-console-logger";
import {
  Logger,
  LogType,
  LogWriterParams,
  LogWriter,
  Log
} from "../types/index";

export default class WebLogger implements Logger {
  public constructor(
    private sections = ["log", "info", "warn", "error"],
    private writer: LogWriter = new WebConsoleWriter()
  ) {}

  public log(...args: any[]): void {
    args = Array.prototype.slice.call(arguments);
    this.writeLog({ type: "log", args, section: "log" });
  }

  public info(...args: any[]): void {
    args = Array.prototype.slice.call(arguments);
    this.writeLog({ type: "info", args, section: "info" });
  }

  public warn(...args: any[]): void {
    args = Array.prototype.slice.call(arguments);
    this.writeLog({ type: "warn", args, section: "warn" });
  }

  public error(...args: any[]): void {
    args = Array.prototype.slice.call(arguments);
    this.writeLog({ type: "error", args, section: "error" });
  }

  public group(section: string, type: LogType = "log"): Log {
    return (...args1: any[]) => {
      var args = Array.prototype.slice.call(args1);
      this.writeLog({ type, args, section, isGroup: true });
    };
  }

  private writeLog(params: LogWriterParams) {
    if (!this.isInAvailableSections(params.section)) return;

    this.writer.write(params);
  }

  private isInAvailableSections(section: string): boolean {
    if (!this.sections || this.sections.length < 1) return true;
    return isInArray(section, this.sections);
  }
}
