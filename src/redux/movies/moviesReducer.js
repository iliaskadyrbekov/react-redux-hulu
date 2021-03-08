import {
  SET_COUNT_PAGE,
  SET_EMPTY_MOVIES,
  SET_GENRES,
  SET_IS_FETCHING_M0VIES,
  SET_LAST_HOME_POSITION_BY_Y,
  SET_MOVIES
} from "./moviesTypes";

const initialState = {
  movies: [],
  genres: [],
  countPage: 1,
  isFetchingMovies: false,
  lastHomePositionByY: 0,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: [
          ...state.movies,
          ...action.payload,
        ]
      };
    case SET_EMPTY_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
    case SET_IS_FETCHING_M0VIES:
      return {
        ...state,
        isFetchingMovies: action.payload,
      };
    case SET_COUNT_PAGE:
      return {
        ...state,
        countPage: action.payload,
      };
    case SET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case SET_LAST_HOME_POSITION_BY_Y:
      return {
        ...state,
        lastHomePositionByY: action.payload,
      };
    default:
      return state;
  }
};

export default moviesReducer;

