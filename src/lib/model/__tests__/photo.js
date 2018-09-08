/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import PHOTO from "../PHOTO";

export const PHOTO1_JSON = {
  name: "photo abcd",
  uri: {
    url: "https://somewhere.com/image1.png"
  }
};
export const PHOTO2_JSON = {
  name: "photo efgh",
  uri: {
    url: "https://somewhere.com/image2.png"
  }
};

export function validatePhoto1(a) {
  expect(a.name).toBe("photo abcd");
  expect(a.uri.url).toBe("https://somewhere.com/image1.png");
}
export function validatePhoto2(a) {
  expect(a.name).toBe("photo efgh");
  expect(a.uri.url).toBe("https://somewhere.com/image2.png");
}

test("Read Photo from JSON", () => {
  validatePhoto1(PHOTO.fromJSON(PHOTO1_JSON));
});

test("Read Photo list from JSON", () => {

  let a = PHOTO.fromJSON([
    PHOTO1_JSON,
    PHOTO2_JSON,
  ]);

  expect(a.length).toBe(2);
  validatePhoto1(a[0]);
  validatePhoto2(a[1]);
});