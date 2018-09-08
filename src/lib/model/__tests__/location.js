/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import Location from "../Location";

export const LOCATION_JSON = {
  longitude: 1.111,
  latitude: 2.222
}

export function validateLocation(l) {
  expect(l.longitude).toBe(1.111);
  expect(l.latitude).toBe(2.222);
}

test("Read Location from JSON", () => {
  validateLocation(Location.fromJSON(LOCATION_JSON));
});

test("Read Location list from JSON", () => {

  let l = Location.fromJSON([
    LOCATION_JSON,
    {
      longitude: 3.333,
      latitude: 4.444
    },
  ]);

  expect(l.length).toBe(2);
  validateLocation(l[0]);

  expect(l[1].longitude).toBe(3.333);
  expect(l[1].latitude).toBe(4.444);
});
