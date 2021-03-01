import {SET_CHECKED_GENRES, SET_CHECKED_YEARS, SET_CURRENT_SORT_BY, SET_IS_FILTERING} from "./filtersTypes";

const initialState = {
  currentSortBy: {'popularity.desc': 'Popular'},
  isFiltering: false,
  checkedFilters: {
    checkedGenres: [],
    checkedYears: [],
  },
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SORT_BY:
      return {
        ...state,
        currentSortBy: action.payload,
      };
    case SET_IS_FILTERING:
      return {
        ...state,
        isFiltering: action.payload,
      };
    case SET_CHECKED_GENRES:
      return {
        ...state,
        checkedFilters: {
          ...state.checkedFilters,
          checkedGenres: action.payload,
        },
      };
    case SET_CHECKED_YEARS:
      return {
        ...state,
        checkedFilters: {
          ...state.checkedFilters,
          checkedYears: action.payload,
        },
      };
    default:
      return state;
  }
};

export default filtersReducer;

