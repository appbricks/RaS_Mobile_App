/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import Attribute from "../Attribute";

export const ATTRIBUTE1_JSON = {
  name: "abcd",
  value: "1234"
};
export const ATTRIBUTE2_JSON = {
  name: "efgh",
  value: "5678"
};

export function validateAttribute1(a) {
  expect(a.name).toBe("abcd");
  expect(a.value).toBe("1234");
}
export function validateAttribute2(a) {
  expect(a.name).toBe("efgh");
  expect(a.value).toBe("5678");
}

test("Read Attribute from JSON", () => {
  validateAttribute1(Attribute.fromJSON(ATTRIBUTE1_JSON));
});

test("Read Attribute list from JSON", () => {

  let a = Attribute.fromJSON([
    ATTRIBUTE1_JSON,
    ATTRIBUTE2_JSON,
  ]);

  expect(a.length).toBe(2);
  validateAttribute1(a[0]);
  validateAttribute2(a[1]);
});