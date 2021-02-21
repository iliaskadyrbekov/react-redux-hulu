import {SET_CHECKED_GENRES, SET_CHECKED_YEARS} from "./popupsTypes";

const initialState = {
  checkedFilters: {
    checkedGenres: [],
    checkedYears: [],
  },
};

const popupsReducer = (state = initialState, action) => {
  switch (action.type) {
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

export default popupsReducer;