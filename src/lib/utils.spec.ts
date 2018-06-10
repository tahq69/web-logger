import { test } from "ava";
import {
  isArray,
  isDefined,
  isFunction,
  isInArray,
  isString,
  isUndefined
} from "./utils";

test("isArray properly determines array", t => {
  let actual = isArray([]);
  t.is(actual, true);
});

test("isArray properly determines not array", t => {
  let actual = isArray({});
  t.is(actual, false);
});

test("isInArray properly determines existing element", t => {
  let actual = isInArray("a", ["a", "b"]);
  t.is(actual, true);
});

test("isInArray properly determines un-existing element", t => {
  let actual = isInArray("c", ["a", "b"]);
  t.is(actual, false);
});

test("isDefined properly determines existing variable", t => {
  let variable = "";
  let actual = isDefined(variable);
  t.is(actual, true);
});

test("isDefined properly determines un-existing variable", t => {
  let variable;
  let actual = isDefined(variable);
  t.is(actual, false);
});

test("isUndefined properly determines un-existing variable", t => {
  let variable;
  let actual = isUndefined(variable);
  t.is(actual, true);
});

test("isUndefined properly determines existing variable", t => {
  let variable = 0;
  let actual = isUndefined(variable);
  t.is(actual, false);
});

test("isFunction properly determines function", t => {
  let func = () => null;
  let actual = isFunction(func);
  t.is(actual, true);
});

test("isFunction properly determines not a function", t => {
  let func = null;
  let actual = isFunction(func);
  t.is(actual, false);
});

test("isString properly determines string value", t => {
  let actual = isString("string");
  t.is(actual, true);
});

test("isString properly determines not a string value", t => {
  let actual = isString(NaN);
  t.is(actual, false);
});
