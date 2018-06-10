import { LogWriter, LogWriterParams } from "../types";

export class WebConsoleWriter implements LogWriter {
  private readonly console: Console;
  private section: string;

  constructor(windowConsole?: Console) {
    this.console = windowConsole || console;
    this.section = "__default__";
  }

  public write({ type, section, args, isGroup }: LogWriterParams): void {
    if (this.section != section && this.section !== "__default__") {
      // close last group if it is not same as current log.
      this.console.groupEnd();
    } else if (isGroup) {
      // open new group and save section name to be able compare it in next log
      // write.
      this.console.group(section);
      this.section = section;
    }

    this.console[type].apply(this.console, args);
  }
}
