import {
  Log,
  Logger,
  LogType,
  LogWriter,
  LogWriterParams
} from "../types/index";
import { isInArray } from "./utils";
import { WebConsoleWriter } from "./web-console-logger";

export default class WebLogger implements Logger {
  public constructor(
    private sections: ReadonlyArray<any> = ["log", "info", "warn", "error"],
    private writer: LogWriter = new WebConsoleWriter()
  ) {}

  public log(...args: Array<any>): void {
    args = Array.prototype.slice.call(arguments);
    this.writeLog({ type: "log", args, section: "log" });
  }

  public info(...args: Array<any>): void {
    args = Array.prototype.slice.call(arguments);
    this.writeLog({ type: "info", args, section: "info" });
  }

  public warn(...args: Array<any>): void {
    args = Array.prototype.slice.call(arguments);
    this.writeLog({ type: "warn", args, section: "warn" });
  }

  public error(...args: Array<any>): void {
    args = Array.prototype.slice.call(arguments);
    this.writeLog({ type: "error", args, section: "error" });
  }

  public group(section: string, type: LogType = "log"): Log {
    return (...args1: Array<any>) => {
      let args = Array.prototype.slice.call(args1);
      this.writeLog({ type, args, section, isGroup: true });
    };
  }

  private writeLog(params: LogWriterParams) {
    if (!this.isInAvailableSections(params.section)) { return; }

    this.writer.write(params);
  }

  private isInAvailableSections(section: string): boolean {
    if (!this.sections || this.sections.length < 1) { return true; }
    return isInArray(section, this.sections);
  }
}
