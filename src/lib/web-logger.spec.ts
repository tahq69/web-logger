import { test } from "ava";
import * as sinon from "sinon";
import WebLogger from "./web-logger";

test("WebLogger properly calls writer on log", t => {
  let spy = sinon.spy();
  let sut = new WebLogger([], { write: spy });

  sut.log("hello");

  t.is(spy.called, true);

  let argument = spy.getCall(0).args[0];
  t.is(argument.type, "log");
  t.is(argument.section, "log");
  t.deepEqual(argument.args, ["hello"]);
});

test("WebLogger does not call writer on un-configured section", t => {
  let spy = sinon.spy();
  let sut = new WebLogger(["001"], { write: spy });

  sut.log("hello");

  t.is(spy.called, false);
});

test("WebLogger properly calls writer on info", t => {
  let spy = sinon.spy();
  let sut = new WebLogger([], { write: spy });

  sut.info("hello");

  t.is(spy.called, true);

  let argument = spy.getCall(0).args[0];
  t.is(argument.type, "info");
  t.is(argument.section, "info");
  t.deepEqual(argument.args, ["hello"]);
});

test("WebLogger properly calls writer on warn", t => {
  let spy = sinon.spy();
  let sut = new WebLogger([], { write: spy });

  sut.warn("hello");

  t.is(spy.called, true);

  let argument = spy.getCall(0).args[0];
  t.is(argument.type, "warn");
  t.is(argument.section, "warn");
  t.deepEqual(argument.args, ["hello"]);
});

test("WebLogger properly calls writer on error", t => {
  let spy = sinon.spy();
  let sut = new WebLogger([], { write: spy });

  sut.error("hello");

  t.is(spy.called, true);

  let argument = spy.getCall(0).args[0];
  t.is(argument.type, "error");
  t.is(argument.section, "error");
  t.deepEqual(argument.args, ["hello"]);
});

test("WebLogger properly calls writer on group log", t => {
  let spy = sinon.spy();
  let sut = new WebLogger([], { write: spy });

  let log = sut.group("001");
  log("hello", 2);

  t.is(spy.called, true);

  let argument = spy.getCall(0).args[0];

  t.is(argument.type, "log");
  t.is(argument.section, "001");
  t.deepEqual(argument.args, ["hello", 2]);
});

test("WebLogger by default does not log group logs", t => {
  let spy = sinon.spy();
  let sut = new WebLogger(undefined, { write: spy });

  let log = sut.group("group");
  log("hello");

  t.is(spy.called, false);
});
