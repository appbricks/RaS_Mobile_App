/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import Space from "../../../../../lib/model/Space";
import Address from "../../../../../lib/model/Address";
import Location from "../../../../../lib/model/Location";
import Specs from "../../../../../lib/model/Specs";
import Attribute from "../../../../../lib/model/Attribute";
import Dimensions, {
  UNITS
} from "../../../../../lib/model/Dimensions";

export function getSpace1Data(): Object {
  return {
    "spaces": [
      {
        "id": "12345",
        "title": "Gym Class Room",
        "headline": "Fitness class space in Motorcity",
        "description": "",
        "ratings": 3,
        "type": "Gym Space",
        "address": {
          "country": "U.A.E",
          "city": "Dubai",
          "addressLines": [
            "Fitness Unlimited",
            "102 Axe building, Motorcity"
          ]
        },
        "location": {
          "longitude": 25.045974,
          "latitude": 55.233820
        },
        "specs": {
          "maxOccupancy": 20,
          "dimensions": {
            "depth": 20,
            "width": 20,
            "height": 6,
            "units": 1
          }
        },
        "attributes": [
          {
            "name": "room type",
            "value": "private room with door"
          },
          {
            "name": "floor shape",
            "value": "square"
          },
          {
            "name": "mirrored walls",
            "value": "all around"
          },
          {
            "name": "sound system",
            "value": "bluetooth capable"
          },
          {
            "name": "equipment",
            "value": "yoga mats, dumbbells, kettlebells"
          }
        ]
      }
    ]
  };
}

export function validateSpace1(s: Space) {

  expect(s.id).toBe("12345");
  expect(s.title).toBe("Gym Class Room");
  expect(s.headline).toBe("Fitness class space in Motorcity");
  expect(s.description).toBe("");
  expect(s.ratings).toBe(3);
  expect(s.type).toBe("Gym Space");

  expect(s.address.country).toBe("U.A.E");
  expect(typeof s.address.postalCode).toBe("undefined");
  expect(typeof s.address.zipCode).toBe("undefined");
  expect(typeof s.address.province).toBe("undefined");
  expect(typeof s.address.state).toBe("undefined");
  expect(s.address.city).toBe("Dubai");
  expect(s.address.addressLines[0]).toBe("Fitness Unlimited");
  expect(s.address.addressLines[1]).toBe("102 Axe building, Motorcity");

  expect(s.location.longitude).toBe(25.045974);
  expect(s.location.latitude).toBe(55.233820);

  expect(s.specs.maxOccupancy).toBe(20);
  expect(s.specs.dimensions.depth).toBe(20);
  expect(s.specs.dimensions.width).toBe(20);
  expect(s.specs.dimensions.height).toBe(6);
  expect(s.specs.dimensions.metric).toBe(UNITS.metric);

  expect(s.attributes.length).toBe(5);
  expect(s.attributes[0].name).toBe("room type");
  expect(s.attributes[0].value).toBe("private room with door");
  expect(s.attributes[1].name).toBe("floor shape");
  expect(s.attributes[1].value).toBe("square");
  expect(s.attributes[2].name).toBe("mirrored walls");
  expect(s.attributes[2].value).toBe("all around");
  expect(s.attributes[3].name).toBe("sound system");
  expect(s.attributes[3].value).toBe("bluetooth capable");
  expect(s.attributes[4].name).toBe("equipment");
  expect(s.attributes[4].value).toBe("yoga mats, dumbbells, kettlebells");
}

export function createSpace2(): Space {
  return new Space(undefined,
    "Fitness Space in DIC",
    "Space in hall ideal for group classes",
    "Open space in well ventilated covered multi-purpose exercise hall",
    3,
    "Gym Space",
    new Address(
      "U.A.E", undefined, undefined, undefined, undefined,
      "Dubai",
      [
        "ABC Fitness",
        "2 Alpha building, Al Rayam Rd",
        "Dubai Internet City"
      ]
    ),
    new Location(25.094259, 55.157418),
    new Specs(30, new Dimensions(25, 20, 10, UNITS.metric)),
    [
      new Attribute("room type", "open space in exercise hall"),
      new Attribute("floor type", "rubber"),
      new Attribute("floor shape", "rectangular"),
      new Attribute("mirrored walls", "south wall"),
      new Attribute("sound system", "none"),
      new Attribute("equipment", "none")
    ]
  )
}

export function validateSpace2(s: Space, modified: boolean = false) {

  expect(s.id).toBe("98765");
  expect(s.title).toBe("Fitness Space in DIC");

  expect(s.headline).toBe("Space in hall ideal for group classes");
  expect(s.description).toBe("Open space in well ventilated covered multi-purpose exercise hall");

  expect(s.type).toBe("Gym Space");

  expect(s.address.country).toBe("U.A.E");
  expect(typeof s.address.postalCode).toBe("undefined");
  expect(typeof s.address.zipCode).toBe("undefined");
  expect(typeof s.address.province).toBe("undefined");
  expect(typeof s.address.state).toBe("undefined");
  expect(s.address.city).toBe("Dubai");
  expect(s.address.addressLines[0]).toBe("ABC Fitness");
  expect(s.address.addressLines[1]).toBe("2 Alpha building, Al Rayam Rd");
  expect(s.address.addressLines[2]).toBe("Dubai Internet City");

  expect(s.location.longitude).toBe(25.094259);
  expect(s.location.latitude).toBe(55.157418);

  expect(s.specs.dimensions.depth).toBe(25);
  expect(s.specs.dimensions.width).toBe(20);
  expect(s.specs.dimensions.height).toBe(10);
  expect(s.specs.dimensions.metric).toBe(UNITS.metric);

  expect(s.attributes[0].name).toBe("room type");
  expect(s.attributes[0].value).toBe("open space in exercise hall");
  expect(s.attributes[1].name).toBe("floor type");
  expect(s.attributes[1].value).toBe("rubber");
  expect(s.attributes[2].name).toBe("floor shape");
  expect(s.attributes[2].value).toBe("rectangular");
  expect(s.attributes[3].name).toBe("mirrored walls");
  expect(s.attributes[3].value).toBe("south wall");
  expect(s.attributes[4].name).toBe("sound system");
  expect(s.attributes[4].value).toBe("none");
  expect(s.attributes[5].name).toBe("equipment");
  expect(s.attributes[5].value).toBe("none");

  if (modified) {

    s.specs.maxOccupancy = 25;
    expect(s.attributes.length).toBe(7);
    expect(s.attributes[6].name).toBe("lighting");
    expect(s.attributes[6].value).toBe("flourescent");

  } else {
    expect(s.ratings).toBe(3);
    expect(s.specs.maxOccupancy).toBe(30);
    expect(s.attributes.length).toBe(6);
  }
}

export function modifySpace2(s: Space): Space {

  s.ratings = 5;
  s.specs.maxOccupancy = 25;
  s.attributes.push(new Attribute(
    "lighting",
    "flourescent"
  ));

  return s;
}
