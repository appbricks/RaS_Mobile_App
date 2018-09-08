/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 * 
 * Space listing action dispatch creators
 */
import {
  LOAD_LISTINGS,
  ADD_LISTING,
  MODIFY_LISTING,
  DELETE_LISTING,
  ENUMERATE_RESERVATIONS,
} from "./types";

import Logger from "../../../lib/utils/Logger";

export const loadListings = () => {
  return {
    type: LOAD_LISTINGS,
    data: {}
  };
};

export const addListing = () => {
  return {
    type: ADD_LISTING,
    data: {}
  };
};

export const modifyListing = () => {
  return {
    type: MODIFY_LISTING,
    data: {}
  };
};

export const deleteListing = () => {
  return {
    type: DELETE_LISTING,
    data: {}
  };
};

export const enumerateReservations = () => {
  return {
    type: ENUMERATE_RESERVATIONS,
    data: {}
  };
};
