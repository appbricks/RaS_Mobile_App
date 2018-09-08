/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import Logger from "../../../lib/utils/Logger";

import Space from "../../../lib/model/Space";

export default class SpaceService {

  constructor() {
    this.logger = new Logger("SpaceService");
  }

  loadSpaces(): Promise<Object> {
    this.logger.trace("loading all spaces for current user");
    return "{}";
  }

  saveSpace(
    space: Space
  ): Promise<Object> {
    this.logger.trace("saving space: ", space);
  }

  deleteSpace(
    space: Space
  ): Promise<Object> {
    this.logger.trace("deleting space: ", space);
  }
}
