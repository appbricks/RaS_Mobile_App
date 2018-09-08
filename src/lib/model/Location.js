/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

export default class Location {

  longitude: float;
  latitude: float;

  constructor(
    longitude: float = undefined,
    latitude: float = undefined) {

    this.longitude = longitude;
    this.latitude = latitude;
  }

  static fromJSON(json) {
    if (json) {
      if (Array.isArray(json)) {
        return json.map(j => Location._instanceFromJson(j));
      } else {
        return Location._instanceFromJson(json)
      }
    } else {
      return undefined;
    }
  }

  static _instanceFromJson(json) {

    return new Location(
      json.longitude,
      json.latitude
    )
  }
}
