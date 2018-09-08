/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

export default class Address {

  country: string;

  postalCode: string;
  zipCode: string;

  province: string;
  state: string;

  city: string;
  addressLines: Array<string>;

  constructor(
    country: string = undefined,
    postalCode: string = undefined,
    zipCode: string = undefined,
    province: string = undefined,
    state: string = undefined,
    city: string = undefined,
    addressLines: Array<string> = undefined) {

    this.country = country;
    this.postalCode = postalCode;
    this.zipCode = zipCode;
    this.province = province;
    this.state = state;
    this.city = city;
    this.addressLines = addressLines || [];
  }

  static fromJSON(json) {

    if (json) {
      if (Array.isArray(json)) {
        return json.map(j => Address._instanceFromJson(j));
      } else {
        return Address._instanceFromJson(json)
      }
    } else {
      return undefined;
    }
  }

  static _instanceFromJson(json) {

    return new Address(
      json.country,
      json.postalCode,
      json.zipCode,
      json.province,
      json.state,
      json.city,
      json.addressLines
    );
  }
}
