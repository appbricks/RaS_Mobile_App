/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

export default class Photo {

  name: String;
  uri: Object;

  constructor(
    name: String = undefined,
    uri: Object = undefined
  ) {

    this.name = name;
    this.uri = uri;
  }

  static fromJSON(json) {
    if (json) {
      if (Array.isArray(json)) {
        return json.map(j => Photo._instanceFromJson(j));
      } else {
        return Photo._instanceFromJson(json)
      }
    } else {
      return undefined;
    }
  }

  static _instanceFromJson(json) {

    return new Photo(
      json.name,
      json.uri
    );
  }
}
