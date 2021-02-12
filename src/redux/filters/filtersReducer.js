import {
  SET_CHECKED_GENRES,
  SET_CHECKED_YEARS,
  SET_CURRENT_SORT_BY,
  SET_IS_FILTERING,
  SET_IS_OPEN_FILTER_POPUP
} from "./filtersTypes";

const initialState = {
  currentSortBy: {'popularity.desc': 'Popular'},
  checkedFilters: {
    checkedGenres: [],
    checkedYears: [],
  },
  isOpenFilterPopup: false,
  isFiltering: false,
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SORT_BY:
      return {
        ...state,
        currentSortBy: action.payload,
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
    case SET_IS_OPEN_FILTER_POPUP:
      return {
        ...state,
        isOpenFilterPopup: action.payload,
      };
    case SET_IS_FILTERING:
      return {
        ...state,
        isFiltering: action.payload,
      };
    default:
      return state;
  }
};

export default filtersReducer;

