import {SET_CURRENT_SORT_BY, SET_IS_FILTERING} from "./filtersTypes";

export const setCurrentSortBy = (sortBy) => ({
  type: SET_CURRENT_SORT_BY,
  payload: sortBy,
});

export const setIsFiltering = (isFiltering) => ({
  type: SET_IS_FILTERING,
  payload: isFiltering,
});



