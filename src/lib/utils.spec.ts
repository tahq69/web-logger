import { test } from "ava";
import {
  isArray,
  isInArray,
  isDefined,
  isUndefined,
  isFunction,
  isString
} from "./utils";

test("isArray properly determines array", t => {
  var actual = isArray([]);
  t.is(actual, true);
});

test("isArray properly determines not array", t => {
  var actual = isArray({});
  t.is(actual, false);
});

test("isInArray properly determines existing element", t => {
  var actual = isInArray("a", ["a", "b"]);
  t.is(actual, true);
});

test("isInArray properly determines un-existing element", t => {
  var actual = isInArray("c", ["a", "b"]);
  t.is(actual, false);
});

test("isDefined properly determines existing variable", t => {
  var variable = "";
  var actual = isDefined(variable);
  t.is(actual, true);
});

test("isDefined properly determines un-existing variable", t => {
  var variable;
  var actual = isDefined(variable);
  t.is(actual, false);
});

test("isUndefined properly determines un-existing variable", t => {
  var variable;
  var actual = isUndefined(variable);
  t.is(actual, true);
});

test("isUndefined properly determines existing variable", t => {
  var variable = 0;
  var actual = isUndefined(variable);
  t.is(actual, false);
});

test("isFunction properly determines function", t => {
  var func = () => null;
  var actual = isFunction(func);
  t.is(actual, true);
});

test("isFunction properly determines not a function", t => {
  var func = null;
  var actual = isFunction(func);
  t.is(actual, false);
});

test("isString properly determines string value", t => {
  var actual = isString("string");
  t.is(actual, true);
});

test("isString properly determines not a string value", t => {
  var actual = isString(NaN);
  t.is(actual, false);
});
