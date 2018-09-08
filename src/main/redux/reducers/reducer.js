/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import uiReducer, { initialUIState } from "./ui"
import authReducer, { initialAuthState } from "./auth"
import spacesReducer, { initialSpacesState } from "./spaces";
import listingsReducer, { initialListingsState } from "./listings";
import alertsReducer, { initialAlertsState } from "./alerts";

/** 
 * Initial state
 * =============
 *
 * ui: {
 * },
 * auth: {
 *   user: <User>,            User instance
 *   timestamp: <number>      Time in milliseconds from epoch when user signed in
 *   newRegistration: <bool>  Whether this is a new registration
 * },
 * spaces: {
 *   spaces: Array<Space>
 * },
 * listings: {
 *   listings: Array<Listing>,
 *   reservations: Array<Reservtion>
 * },
 * alerts: {
 * }
 * 
 */

const initialState = () => {
  return {
    ui: initialUIState(),
    auth: initialAuthState(),
    spaces: initialSpacesState(),
    listings: initialListingsState(),
    alerts: initialAlertsState()
  };
};

export const reducer = (state = initialState(), action) => {

  return {
    ui: uiReducer(state.ui, action),
    auth: authReducer(state.auth, action),
    spaces: spacesReducer(state.spaces, action),
    listings: listingsReducer(state.listings, action),
    alerts: alertsReducer(state.alerts, action)
  };
};
