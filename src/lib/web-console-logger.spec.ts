import { test } from "ava";
import * as sinon from "sinon";
import { WebConsoleWriter } from "./web-console-logger";

function createConsole() {
  return ({
    log: sinon.spy(),
    info: sinon.spy(),
    warn: sinon.spy(),
    error: sinon.spy(),
    group: sinon.spy(),
    endGroup: sinon.spy(),
    table: sinon.spy()
  } as any) as Console;
}

test("WebConsoleWriter constructor properly creates instance", t => {
  var spy = createConsole();
  var sut = new WebConsoleWriter(spy);
  t.is(!!sut, true);
});
