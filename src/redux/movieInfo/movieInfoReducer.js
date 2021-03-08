import {
  SET_CURRENT_LOCATION_PATH,
  SET_IS_FETCHING_MOVIE_INFO,
  SET_MOVIE_CAST,
  SET_MOVIE_INFO,
  SET_RECOMMENDATION_MOVIES
} from "./movieInfoTypes";

const initialState = {
  movieInfo: {},
  movieCast: {},
  recommendationMovies: [],
  currentLocationPath: '/',
  isFetchingMovieInfo: true,
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
    case SET_RECOMMENDATION_MOVIES:
      return {
        ...state,
        recommendationMovies: action.payload,
      };
    case SET_CURRENT_LOCATION_PATH:
      return {
        ...state,
        currentLocationPath: action.payload,
      };
    case SET_IS_FETCHING_MOVIE_INFO:
      return {
        ...state,
        isFetchingMovieInfo: action.payload,
      };
    default:
      return state;
  }
};

export default movieInfoReducer;

