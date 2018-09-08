/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import {
  LOAD_SPACES,
  ADD_SPACE,
  MODIFY_SPACE,
  DELETE_SPACE,
  ADD_SPACE_IMAGE,
  DELETE_SPACE_IMAGE
} from "../actions/types";

import Space from "../../../lib/model/Space";
import SpaceService from "../services/space";
import Logger from "../../../lib/utils/Logger";

const spaceService = new SpaceService();

export const initialSpacesState = (
  spaces = []
) => {
  return {
    spaces
  };
};

const reducer = (state, action) => {

  switch (action.type) {

    case LOAD_SPACES:

      spaceService.loadSpaces()
        .then(data => {
          state.spaces = Space.fromJSON(data.spaces);

          const onUpdate = action.callbacks.onUpdate;
          if (onUpdate) {
            onUpdate();
          }
        })
        .catch(error => {
          const onError = action.callbacks.onError;
          if (onError) {
            onError(error);
          } else {
            Logger.error("spaces reducer",
              "error loading spaces from backend:", error);
          }
        });
      break;

    case ADD_SPACE:

      spaceService.saveSpace(action.data.space)
        .then(data => {
          state.spaces.push(data);

          const onUpdate = action.callbacks.onUpdate;
          if (onUpdate) {
            onUpdate();
          }
        })
        .catch(error => {
          const onError = action.callbacks.onError;
          if (onError) {
            onError(error);
          } else {
            Logger.error("spaces reducer",
              "error saving space",
              action.data.space,
              " to backend:", error);
          }
        });
      break;

    case MODIFY_SPACE:

      spaceService.saveSpace(action.data.space)
        .then(data => {

          const onUpdate = action.callbacks.onUpdate;
          if (onUpdate) {
            onUpdate();
          }
        })
        .catch(error => {
          const onError = action.callbacks.onError;
          if (onError) {
            onError(error);
          } else {
            Logger.error("spaces reducer",
              "error modifying space",
              action.data.space,
              " to backend:", error);
          }
        });
      break;

    case DELETE_SPACE:

      let space = state.spaces.find(
        s => s.id == action.data.id);

      if (space) {

        spaceService.deleteSpace(action.data.id)
          .then(data => {

            state.spaces = state.spaces.filter(
              s => s.id != action.data.id);

            const onUpdate = action.callbacks.onUpdate;
            if (onUpdate) {
              onUpdate();
            }
          })
          .catch(error => {
            const onError = action.callbacks.onError;
            if (onError) {
              onError(error);
            } else {
              Logger.error("spaces reducer",
                "error deleting space",
                action.data.id,
                ":", error);
            }
          });

      } else {

        error = "no space with id " + action.data.id +
          " found in application state";

        const onError = action.callbacks.onError;
        if (onError) {
          onError(error);
        } else {
          Logger.error(error);
        }
      }
      break;

    case ADD_SPACE_IMAGE:
      break;

    case DELETE_SPACE_IMAGE:
      break;
  }
  return state;
}

export default reducer;
