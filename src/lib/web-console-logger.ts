import { LogWriter, LogWriterParams } from "../types";

export class WebConsoleWriter implements LogWriter {
  private console: Console;

  constructor(console?: Console) {
    this.console = console || window.console;
  }

  write({ type, section, args, isComponent, isGroup }: LogWriterParams): void {
    this.console[type](
      "%s : %s : %s : %s",
      section,
      args,
      isComponent,
      isGroup
    );
  }
}
