/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import {
  loadSpaces,
  addSpace,
  modifySpace,
  deleteSpace,
  addSpaceImage,
  deleteSpaceImage
} from "../../../redux";

import SpaceService from "../../services/space";
jest.mock("../../services/space");

import {
  state,
  initialize,
  dispatch
} from "./reducer";

import {
  getSpace1Data,
  validateSpace1,
  createSpace2,
  validateSpace2,
  modifySpace2
} from "./data/spaces";

describe("managing spaces", () => {

  const spaceService = SpaceService.mock.instances[0];
  const loadSpacesAPI = spaceService.loadSpaces;
  const saveSpaceAPI = spaceService.saveSpace;
  const deleteSpaceAPI = spaceService.deleteSpace;

  beforeAll(() => {
    initialize();
  });

  test("loading list of all spaces from the backend api", done => {

    const spacesData = getSpace1Data();
    loadSpacesAPI.mockResolvedValueOnce(spacesData);

    const s = state();

    dispatch(loadSpaces(
      () => {
        expect(s.spaces).toBeTruthy();
        expect(s.spaces.spaces.length).toBe(1);
        validateSpace1(s.spaces.spaces[0]);

        done();
      },
      (error) => {
        done.fail(error);
      }));

    expect(loadSpacesAPI).toHaveBeenCalledTimes(1);
  });

  test("adding new space", done => {

    saveSpaceAPI.mockImplementationOnce(data => {
      return new Promise((resolve, reject) => {

        try {
          data.id = "98765";
          validateSpace2(data);
          resolve(data);

        } catch (error) {
          done.fail(error);
        }
      });
    });

    const s = state();

    dispatch(addSpace(
      createSpace2(),
      () => {
        expect(s.spaces).toBeTruthy();
        expect(s.spaces.spaces.length).toBe(2);
        validateSpace2(s.spaces.spaces[1]);

        done();
      },
      (error) => {
        done.fail(error);
      }));

    expect(saveSpaceAPI).toHaveBeenCalledTimes(1);
  });

  test("modifying an existing space", done => {

    saveSpaceAPI.mockImplementationOnce(data => {
      return new Promise((resolve, reject) => {

        try {
          validateSpace2(data, true);
          resolve(data);

        } catch (error) {
          done.fail(error);
        }
      });
    });

    const s = state();
    space = modifySpace2(s.spaces.spaces[1]);

    dispatch(modifySpace(
      space,
      () => {
        expect(s.spaces).toBeTruthy();
        expect(s.spaces.spaces.length).toBe(2);
        validateSpace2(s.spaces.spaces[1], true);

        done();
      },
      (error) => {
        done.fail(error);
      }));

    expect(saveSpaceAPI).toHaveBeenCalledTimes(2);
  });

  test("deleting a space", done => {

    deleteSpaceAPI.mockImplementationOnce(id => {
      return new Promise((resolve, reject) => {

        try {
          expect(id).toBe("12345");
          resolve(id);

        } catch (error) {
          done.fail(error);
        }
      });
    });

    const s = state();

    dispatch(deleteSpace(
      "12345",
      () => {
        expect(s.spaces).toBeTruthy();
        expect(s.spaces.spaces.length).toBe(1);
        validateSpace2(s.spaces.spaces[0], true);

        done();
      },
      (error) => {
        done.fail(error);
      }));

    expect(deleteSpaceAPI).toHaveBeenCalledTimes(1);
  });

  test("error attempting to deleting a non-existent space", done => {

    dispatch(deleteSpace(
      "11111",
      () => {
        done.fail(
          "space backend should not be called with non-existent space id");
      },
      (error) => {
        expect(error).toBe(
          "no space with id 11111 found in application state");

        done();
      }));
  });

}); // managing spaces
