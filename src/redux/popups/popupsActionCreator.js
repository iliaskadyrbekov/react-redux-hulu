import {SET_CHECKED_GENRES, SET_CHECKED_YEARS, SET_IS_OPEN_CREW_POPUP, SET_IS_OPEN_FILTER_POPUP} from "./popupsTypes";

export const setCheckedGenres = (checkedGenres) => ({
  type: SET_CHECKED_GENRES,
  payload: checkedGenres,
});

export const setCheckedYears = (checkedYears) => ({
  type: SET_CHECKED_YEARS,
  payload: checkedYears,
});

export const setIsOpenFilterPopup = (isOpenFilterPopUp) => ({
  type: SET_IS_OPEN_FILTER_POPUP,
  payload: isOpenFilterPopUp,
});

export const setIsOpenCrewPopup = (isOpenCrewPopup) => ({
  type: SET_IS_OPEN_CREW_POPUP,
  payload: isOpenCrewPopup,
});
