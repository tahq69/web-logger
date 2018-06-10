import Vue from "vue";

import { isInArray, isFunction, isDefined, isString } from "./utils";

import {
  Logger,
  LogType,
  LogWriterParams,
  LoggerOptions,
  LogWriter
} from "../types/index";

export default class WebLogger implements Logger {
  private target: string | boolean;
  private sections: string[];
  private console: Console;

  public constructor({ target, sections }: LoggerOptions, writter?: LogWriter) {
    this.target = target;
    this.sections = sections;
    this.console = console || window.console;
  }

  log(...args: any[]): void {
    this.writeLog({ type: "log", args, section: "global" });
  }

  info(...args: any[]): void {
    this.writeLog({ type: "info", args, section: "info" });
  }

  error(...args: any[]): void {
    this.writeLog({ type: "error", args, section: "error" });
  }

  group(
    section: string,
    type: LogType = "log",
    isComponent = false
  ): (...args: any[]) => void {
    return (...args: any[]) => {
      args.unshift(section);
      this.writeLog({ type, args, section, isComponent, isGroup: true });
    };
  }

  component(vm: Vue, ...args: any[]): (...args: any[]) => void {
    const component = vm.$options.name;
    let logArguments = [component, ...args];

    /*if (vm.$route) {
      const route = { ...vm.$route.params, path: vm.$route.fullPath };
      logArguments = [component, { route }, ...args];
    }*/

    this.writeLog({
      type: "log",
      args: logArguments,
      section: "component",
      isComponent: true
    });

    return this.group(vm.$options.name || "unnamed", "log", true);
  }

  private writeLog(params: LogWriterParams) {
    const section = params.isComponent ? "component" : params.section;
    if (!this.isInAvailableSections(section)) return;

    if (this.target === "console") {
      return this.consoleLog(params.type, params.args, params.isGroup);
    }
  }

  private consoleLog(type: LogType, args: any[], isGroup = false) {
    var hasConsole = window.console && console[type];
    var hasGroup = !!(hasConsole && window.console.group);
    if (!hasConsole) return;

    if (isGroup && hasGroup) {
      var section = args.shift();
      console.group(section);
      this.smartLog(type, args);
      console.groupEnd();
    } else {
      this.smartLog(type, args);
    }
  }

  private smartLog(type: LogType, args: any[]) {
    if (
      isDefined(args) &&
      args.length === 1 &&
      !isFunction(args[0]) &&
      !isString(args[0])
    ) {
      console.group(type);
      Object.keys(args[0]).forEach(key =>
        console[type].apply(console, [`${key}:`, args[0][key]])
      );
      console.groupEnd();
    } else {
      console[type].apply(console, args);
    }
  }

  private isInAvailableSections(section: string): boolean {
    if (!this.sections || this.sections.length < 1) return true;
    return isInArray(section, this.sections);
  }
}
