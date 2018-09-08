/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import {
} from "../actions/types";

import AlertService from "../services/alert";
import Logger from "../../../lib/utils/Logger";

const alertService = new AlertService();

export const initialAlertsState = (
  alerts = []
) => {
  return {
    alerts
  };
};

const reducer = (state, action) => {

  switch (action.type) {

  }
  return state;
}

export default reducer;
