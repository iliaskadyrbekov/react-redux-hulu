import {
  SET_COUNT_PAGE,
  SET_EMPTY_MOVIES,
  SET_GENRES,
  SET_IS_FETCHING_M0VIES,
  SET_MOVIES
} from "./moviesTypes";

const initialState = {
  movies: [],
  genres: [],
  countPage: 1,
  isFetchingMovies: false,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return { // TODO
        ...state,
        movies: [
          ...state.movies,
          ...action.payload,
        ]
      };
    case SET_IS_FETCHING_M0VIES:
      return {
        ...state,
        isFetchingMovies: action.payload,
      };
    case SET_EMPTY_MOVIES:
      return {
        ...state,
        movies: [],
      };

    case SET_COUNT_PAGE:
      return { // TODO
        ...state,
        countPage: action.payload,
      };
    case SET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    default:
      return state;
  }
};

export default moviesReducer;

