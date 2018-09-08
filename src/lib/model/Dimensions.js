import { float } from "aws-sdk/clients/lightsail";

/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

export const UNITS = Object.freeze({
  "metric": 1,
  "imperial": 2
});

export default class Dimensions {

  unit: number;

  depth: float;
  width: float;
  height: float;

  constructor(
    depth: float = undefined,
    width: float = undefined,
    height: float = undefined,
    metric: number = undefined) {

    this.depth = depth;
    this.width = width;
    this.height = height;

    this.metric = metric || UNITS.metric;
  }

  static fromJSON(json) {
    if (json) {
      if (Array.isArray(json)) {
        return json.map(j => Dimensions._instanceFromJson(j));
      } else {
        return Dimensions._instanceFromJson(json)
      }
    } else {
      return undefined;
    }
  }

  static _instanceFromJson(json) {

    return new Dimensions(
      json.depth,
      json.width,
      json.height,
      json.metric
    );
  }
}
