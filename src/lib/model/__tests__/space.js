/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import Space from "../Space";

import {
  ADDRESS_JSON,
  validateAddress
} from "./address";
import {
  LOCATION_JSON,
  validateLocation
} from "./location";
import {
  SPECS1_JSON,
  validateSpecs1
} from "./specs";
import {
  ATTRIBUTE1_JSON,
  ATTRIBUTE2_JSON,
  validateAttribute1,
  validateAttribute2
} from "./attribute";
import {
  PHOTO1_JSON,
  PHOTO2_JSON,
  validatePhoto1,
  validatePhoto2
} from "./photo";

test("Read Space from JSON", () => {

  let s = Space.fromJSON({

    id: "12345",
    title: "abcd",
    headline: "abcd efgh",
    description: "ijkl mnop qrst uvwx yz",
    ratings: 3,
    type: "xxyyzz",

    address: ADDRESS_JSON,
    location: LOCATION_JSON,
    specs: SPECS1_JSON,

    attributes: [
      ATTRIBUTE1_JSON,
      ATTRIBUTE2_JSON,
    ],

    photos: [
      PHOTO1_JSON,
      PHOTO2_JSON
    ]
  });

  expect(s.id).toBe("12345");
  expect(s.title).toBe("abcd");
  expect(s.headline).toBe("abcd efgh");
  expect(s.description).toBe("ijkl mnop qrst uvwx yz");
  expect(s.ratings).toBe(3);
  expect(s.type).toBe("xxyyzz");

  validateAddress(s.address);
  validateLocation(s.location);
  validateSpecs1(s.specs);
  validateAttribute1(s.attributes[0]);
  validateAttribute2(s.attributes[1]);
  validatePhoto1(s.photos[0]);
  validatePhoto2(s.photos[1]);
});
