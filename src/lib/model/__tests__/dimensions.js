/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import Dimensions, {
  UNITS
} from "../Dimensions";

export const DIMENSIONS1_JSON = {
  depth: 1.111,
  width: 2.222,
  height: 3.333,
  metric: UNITS.metric
};

export const DIMENSIONS2_JSON = {
  depth: 4.444,
  width: 5.555,
  height: 6.666,
  metric: UNITS.imperial
};

export function validateDimensions1(d) {
  expect(d.depth).toBe(1.111);
  expect(d.width).toBe(2.222);
  expect(d.height).toBe(3.333);
  expect(d.metric).toBe(UNITS.metric);
}

export function validateDimensions2(d) {
  expect(d.depth).toBe(4.444);
  expect(d.width).toBe(5.555);
  expect(d.height).toBe(6.666);
  expect(d.metric).toBe(UNITS.imperial);
}

test("Read Dimensions from JSON", () => {
  validateDimensions1(Dimensions.fromJSON(DIMENSIONS1_JSON));
});

test("Read Dimensions list from JSON", () => {

  let d = Dimensions.fromJSON([
    DIMENSIONS1_JSON,
    DIMENSIONS2_JSON,
  ]);

  expect(d.length).toBe(2);
  validateDimensions1(d[0]);
  validateDimensions2(d[1]);
});