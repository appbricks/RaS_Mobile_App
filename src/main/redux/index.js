/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { createStore, applyMiddleware } from "redux";

import { reducer } from "./reducers/reducer";
import { reduxLogger } from "../../lib/utils/Logger";

import { initAuthStore } from "./reducers/auth"

import {
  updateAvatar
} from "./actions/ui";
import {
  loadAuthState,
  signInUser,
  signOutUser,
  resetUser,
  updateUser
} from "./actions/auth";
import {
  loadSpaces,
  addSpace,
  modifySpace,
  deleteSpace,
  addSpaceImage,
  deleteSpaceImage
} from "./actions/spaces";
import {
  loadListings,
  addListing,
  modifyListing,
  deleteListing,
  enumerateReservations
} from "./actions/listings";

const reduxStore = createStore(
  reducer,
  applyMiddleware(reduxLogger)
);

export {
  // Redux store singleton
  reduxStore,

  // Initializes the authentication local 
  // storage which backs up the redux
  // auth state
  initAuthStore,

  // User action dispatch creators
  loadAuthState,
  signInUser,
  signOutUser,
  resetUser,
  updateUser,

  // UI action dispatch creators
  updateAvatar,

  // Space management action dispatch creators
  loadSpaces,
  addSpace,
  modifySpace,
  deleteSpace,
  addSpaceImage,
  deleteSpaceImage,

  // Space listing action dispatch creators
  loadListings,
  addListing,
  modifyListing,
  deleteListing,
  enumerateReservations

  // Alert action dispatch creators
}
