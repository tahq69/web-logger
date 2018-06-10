export type LogType = "log" | "info" | "warn" | "error";
export type Log = (...args: any[]) => void;
