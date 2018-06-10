import { test } from "ava";
import {
  isArray
} from "./utils";

test("isArray properly determines array", t => {
  var actual = isArray([]);
  t.is(actual, true);
});

test("isArray properly determines not array", t => {
  var actual = isArray({});
  t.is(actual, false);
});
