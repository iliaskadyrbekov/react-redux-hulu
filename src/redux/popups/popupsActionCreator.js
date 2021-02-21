import {SET_CHECKED_GENRES, SET_CHECKED_YEARS} from "./popupsTypes";

export const setCheckedGenres = (checkedGenres) => ({
  type: SET_CHECKED_GENRES,
  payload: checkedGenres,
});

export const setCheckedYears = (checkedYears) => ({
  type: SET_CHECKED_YEARS,
  payload: checkedYears,
});