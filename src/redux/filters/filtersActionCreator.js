import {SET_CHECKED_GENRES, SET_CHECKED_YEARS, SET_CURRENT_SORT_BY, SET_IS_FILTERING} from "./filtersTypes";

export const setCurrentSortBy = (sortBy) => ({
  type: SET_CURRENT_SORT_BY,
  payload: sortBy,
});

export const setIsFiltering = (isFiltering) => ({
  type: SET_IS_FILTERING,
  payload: isFiltering,
});

export const setCheckedGenres = (checkedGenres) => ({
  type: SET_CHECKED_GENRES,
  payload: checkedGenres,
});

export const setCheckedYears = (checkedYears) => ({
  type: SET_CHECKED_YEARS,
  payload: checkedYears,
});



