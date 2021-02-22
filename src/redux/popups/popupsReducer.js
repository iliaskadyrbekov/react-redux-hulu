import {SET_CHECKED_GENRES, SET_CHECKED_YEARS, SET_IS_OPEN_CREW_POPUP, SET_IS_OPEN_FILTER_POPUP} from "./popupsTypes";

const initialState = {
  checkedFilters: {
    checkedGenres: [],
    checkedYears: [],
  },
  isOpenFilterPopUp: false,
  isOpenCrewPopup: false,
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
    case SET_IS_OPEN_FILTER_POPUP:
      return {
        ...state,
        isOpenFilterPopUp: action.payload,
      };
    case SET_IS_OPEN_CREW_POPUP:
      return {
        ...state,
        isOpenCrewPopup: action.payload,
      };

    default:
      return state;
  }
};

export default popupsReducer;

