/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import XDate from "xdate";

export const FREQUENCY_TYPE = Object.freeze({
  "day": 1,
  "week": 2,
  "month": 3,
});

export default class Reservation {

  startTime: XDate;
  duration: Number;

  frequency: Number;
}
