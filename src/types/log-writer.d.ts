import { LogWriterParams } from "./log-writer-params";

export interface LogWriter {
  write(log: LogWriterParams): void;
}
