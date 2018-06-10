import { LogWriter, LogWriterParams } from "../types";

export class WebConsoleWriter implements LogWriter {
  private console: Console;

  constructor(windowConsole: Console) {
    this.console = windowConsole || console;
  }

  write({ type, section, args, isGroup }: LogWriterParams): void {
    this.console[type]("%s : %s : %s", section, args, isGroup);
  }
}
