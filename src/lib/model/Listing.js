/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import XDate from "xdate";
import Space from "./Space";
import Reservation from "./Reservation";

export default class Listing {

  id: string;
  space: Space;

  reservations: Array<Reservation>;

  title: string;
  description: string;

  labels: Array<string>;
}
