/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import Address from "./Address";
import Location from "./Location";
import Specs from "./Specs";
import Photo from "./Photo";
import Attribute from "./Attribute";

export default class Space {

  id: string;
  title: string;
  headline: string;
  description: string;
  ratings: number;
  type: string;

  address: Address;
  location: Location;

  specs: Specs;

  attributes: Array<Attribute>;
  photos: Array<Photo>;

  constructor(
    id: string = undefined,
    title: string = undefined,
    headline: string = undefined,
    description: string = undefined,
    ratings: number = undefined,
    type: string = undefined,
    address: Address = undefined,
    location: Location = undefined,
    specs: Specs = undefined,
    attributes: Array<Attribute> = undefined,
    photos: Array<Photo> = undefined
  ) {
    this.id = id;
    this.title = title;
    this.headline = headline;
    this.description = description;
    this.ratings = ratings;
    this.type = type;
    this.address = address;
    this.location = location;
    this.specs = specs;
    this.attributes = attributes;
    this.photos = photos;
  }

  static fromJSON(json) {

    if (json) {
      if (Array.isArray(json)) {
        return json.map(j => Space._instanceFromJson(j));
      } else {
        return Space._instanceFromJson(json)
      }
    } else {
      return undefined;
    }
  }

  static _instanceFromJson(json) {

    return new Space(
      json.id,
      json.title,
      json.headline,
      json.description,
      json.ratings,
      json.type,
      Address.fromJSON(json.address),
      Location.fromJSON(json.location),
      Specs.fromJSON(json.specs),
      Attribute.fromJSON(json.attributes),
      Photo.fromJSON(json.photos)
    )
  }
}
