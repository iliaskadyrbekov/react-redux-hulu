import {fetchFromAPI} from "../../api/api";
import {SET_MOVIE_CAST, SET_MOVIE_INFO} from "./movieInfoTypes";

export const setMovieInfo = (movieInfo) => ({
  type: SET_MOVIE_INFO,
  payload: movieInfo,
});

export const setMovieCast = (movieCast) => ({
  type: SET_MOVIE_CAST,
  payload: movieCast,
});

// export const setIsMovieInfoPage = (isMovieInfoPage) => ({
//   type: SET_IS_MOVIE_INFO_PAGE,
//   payload: isMovieInfoPage,
// });

export const fetchMovieInfo = (url) => {
  return async (dispatch) => {
    await fetchFromAPI(url)
      .then(movieInfo => {
        dispatch(setMovieInfo(movieInfo));
      }).catch(error => {
        alert(error.message);
      });
  };
};

export const fetchMovieCast = (url) => {
  return async (dispatch) => {
    await fetchFromAPI(url)
      .then(movieCast => {
        dispatch(setMovieCast(movieCast));
      }).catch(error => {
        alert(error.message);
      });
  };
};

