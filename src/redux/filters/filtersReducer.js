import {SET_CURRENT_SORT_BY, SET_IS_FILTERING} from "./filtersTypes";

const initialState = {
  currentSortBy: {'popularity.desc': 'Popular'},
  isFiltering: false,
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
    default:
      return state;
  }
};

export default filtersReducer;

