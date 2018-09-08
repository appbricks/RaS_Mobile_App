/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { reducer } from "../../reducer";

const env = {
  reduxState: {}
};

export function state() {
  return env.reduxState;
}

export function initialize() {

  env.reduxState = reducer(
    undefined,
    { action: undefined });
}

export function dispatch(action) {
  env.reduxState = reducer(env.reduxState, action);
}
