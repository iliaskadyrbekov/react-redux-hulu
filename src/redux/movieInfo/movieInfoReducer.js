import {SET_CURRENT_LOCATION_PATH, SET_MOVIE_CAST, SET_MOVIE_INFO} from "./movieInfoTypes";

const initialState = {
  movieInfo: {},
  movieCast: {},
  currentLocationPath: '/',
};

const movieInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIE_INFO:
      return {
        ...state,
        movieInfo: action.payload,
      };
    case SET_MOVIE_CAST:
      return {
        ...state,
        movieCast: action.payload,
      };
    case SET_CURRENT_LOCATION_PATH:
      return {
        ...state,
        currentLocationPath: action.payload,
      };
    default:
      return state;
  }
};

export default movieInfoReducer;

