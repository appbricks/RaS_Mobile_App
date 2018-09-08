/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import Dimensions from "./Dimensions";

export default class Specs {

  maxOccupancy: number;
  dimensions: Dimensions;

  constructor(
    maxOccupancy: number = undefined,
    dimensions: Dimensions = undefined,
  ) {
    this.maxOccupancy = maxOccupancy;
    this.dimensions = dimensions;
  }

  static fromJSON(json) {
    if (json) {
      if (Array.isArray(json)) {
        return json.map(j => Specs._instanceFromJson(j));
      } else {
        return Specs._instanceFromJson(json)
      }
    } else {
      return undefined;
    }
  }

  static _instanceFromJson(json) {

    return new Specs(
      json.maxOccupancy,
      Dimensions.fromJSON(json.dimensions)
    );
  }
}
