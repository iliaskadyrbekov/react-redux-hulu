import {SET_CURRENT_LOCATION_PATH, SET_MOVIE_CAST, SET_MOVIE_INFO} from "./movieInfoTypes";
import {fetchFromAPI} from "../../api/fetchAPI";

export const setMovieInfo = (movieInfo) => ({
  type: SET_MOVIE_INFO,
  payload: movieInfo,
});

export const setMovieCast = (movieCast) => ({
  type: SET_MOVIE_CAST,
  payload: movieCast,
});

export const setCurrentLocationPath = (currentLocationPath) => ({
  type: SET_CURRENT_LOCATION_PATH,
  payload: currentLocationPath,
});

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

