/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import Address from "../Address";

export const ADDRESS_JSON = {
  country: "U.S.A.",
  zipCode: "01581",
  state: "MA",
  city: "Westborough",
  addressLines: [
    "1 Main Street",
    "Unit 2"
  ]
};

export function validateAddress(a) {
  expect(a.country).toBe("U.S.A.");
  expect(typeof a.postalCode).toBe("undefined");
  expect(a.zipCode).toBe("01581");
  expect(typeof a.province).toBe("undefined");
  expect(a.state).toBe("MA");
  expect(a.city).toBe("Westborough");
  expect(a.addressLines[0]).toBe("1 Main Street");
  expect(a.addressLines[1]).toBe("Unit 2");
}

test("Read Address from JSON", () => {
  validateAddress(Address.fromJSON(ADDRESS_JSON));
});

test("Read Address list from JSON", () => {

  let a = Address.fromJSON([
    ADDRESS_JSON,
    {
      country: "U.A.E.",
      postalCode: "500166",
      province: "Dubayy",
      city: "Dubai",
      addressLines: [
        "EMC Alpha Building",
        "Dubai Internet City",
        "P.O. Box 500166"
      ]
    },
  ]);

  expect(a.length).toBe(2);
  validateAddress(a[0]);

  expect(a[1].country).toBe("U.A.E.");
  expect(a[1].postalCode).toBe("500166");
  expect(typeof a[1].zipCode).toBe("undefined");
  expect(a[1].province).toBe("Dubayy");
  expect(typeof a[1].state).toBe("undefined");
  expect(a[1].city).toBe("Dubai");
  expect(a[1].addressLines[0]).toBe("EMC Alpha Building");
  expect(a[1].addressLines[1]).toBe("Dubai Internet City");
  expect(a[1].addressLines[2]).toBe("P.O. Box 500166");
});