/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import {
  LOAD_LISTINGS,
  ADD_LISTING,
  MODIFY_LISTING,
  DELETE_LISTING,
  ENUMERATE_RESERVATIONS,
} from "../actions/types";

import ListingService from "../services/listing";
import Logger from "../../../lib/utils/Logger";

const listingService = new ListingService();

export const initialListingsState = (
  listings = [],
  reservations = {}
) => {
  return {
    listings,
    reservations
  };
};

const reducer = (state, action) => {

  switch (action.type) {

  }
  return state;
}

export default reducer;
