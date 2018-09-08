/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 * 
 * Space management action dispatch creators
 */
import {
  LOAD_SPACES,
  ADD_SPACE,
  MODIFY_SPACE,
  DELETE_SPACE,
  ADD_SPACE_IMAGE,
  DELETE_SPACE_IMAGE
} from "./types";

import Space from "../../../lib/model/Space";
import Logger from "../../../lib/utils/Logger";

export const loadSpaces = (
  onUpdate?: () => void,
  onError?: (object) => error
) => {

  return {
    type: LOAD_SPACES,
    data: {},
    callbacks: {
      onUpdate,
      onError
    }
  };
};

export const addSpace = (
  space: Space,
  onUpdate?: () => void,
  onError?: (object) => error
) => {
  return {
    type: ADD_SPACE,
    data: {
      space
    },
    callbacks: {
      onUpdate,
      onError
    }
  };
};

export const modifySpace = (
  space: Space,
  onUpdate?: () => void,
  onError?: (object) => error
) => {
  return {
    type: MODIFY_SPACE,
    data: {
      space
    },
    callbacks: {
      onUpdate,
      onError
    }
  };
};

export const deleteSpace = (
  id: String,
  onUpdate?: () => void,
  onError?: (object) => error
) => {
  return {
    type: DELETE_SPACE,
    data: {
      id
    },
    callbacks: {
      onUpdate,
      onError
    }
  };
};

export const addSpaceImage = (
  onUpdate?: () => void,
  onError?: (object) => error
) => {
  return {
    type: ADD_SPACE_IMAGE,
    data: {},
    callbacks: {
      onUpdate,
      onError
    }
  };
};

export const deleteSpaceImage = (
  onUpdate?: () => void,
  onError?: (object) => error
) => {
  return {
    type: DELETE_SPACE_IMAGE,
    data: {},
    callbacks: {
      onUpdate,
      onError
    }
  };
};
