import {SET_MOVIE_CAST, SET_MOVIE_INFO} from "./movieInfoTypes";

const initialState = {
  movieInfo: {},
  movieCast: {},
  // isMovieInfoPage: false,
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
    // case SET_IS_MOVIE_INFO_PAGE:
    //   return {
    //     ...state,
    //     movieInfo: action.payload,
    //   };
    default:
      return state;
  }
};

export default movieInfoReducer;

