/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

export default class Attribute {

  name: number;
  value: string;

  constructor(
    name: string = undefined,
    value: string = undefined) {

    this.name = name;
    this.value = value;
  }

  static fromJSON(json) {
    if (json) {
      if (Array.isArray(json)) {
        return json.map(j => Attribute._instanceFromJson(j));
      } else {
        return Attribute._instanceFromJson(json)
      }
    } else {
      return undefined;
    }
  }

  static _instanceFromJson(json) {

    return new Attribute(
      json.name,
      json.value
    );
  }
}
