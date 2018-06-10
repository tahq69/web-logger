import { LogType } from "./types";

export interface LogWriterParams {
  type: LogType;
  args: any[];
  section: string;
  isComponent?: boolean;
  isGroup?: boolean;
}
