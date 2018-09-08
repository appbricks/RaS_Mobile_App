/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import Specs from "../Specs";
import {
  UNITS
} from "../Dimensions";

import {
  DIMENSIONS1_JSON,
  DIMENSIONS2_JSON,
  validateDimensions1,
  validateDimensions2
} from "./dimensions";

export const SPECS1_JSON = {
  maxOccupancy: 1,
  dimensions: DIMENSIONS1_JSON
};

export const SPECS2_JSON = {
  maxOccupancy: 2,
  dimensions: DIMENSIONS2_JSON
};

export function validateSpecs1(s) {
  expect(s.maxOccupancy).toBe(1);
  validateDimensions1(s.dimensions);
}

export function validateSpecs2(s) {
  expect(s.maxOccupancy).toBe(2);
  validateDimensions2(s.dimensions);
}

test("Read Specs from JSON", () => {
  validateSpecs1(Specs.fromJSON(SPECS1_JSON));
});

test("Read Specs list from JSON", () => {

  let s = Specs.fromJSON([
    SPECS1_JSON,
    SPECS2_JSON,
  ]);

  expect(s.length).toBe(2);
  validateSpecs1(s[0]);
  validateSpecs2(s[1]);
});