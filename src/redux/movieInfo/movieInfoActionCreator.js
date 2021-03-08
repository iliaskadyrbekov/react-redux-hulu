import {
  SET_CURRENT_LOCATION_PATH,
  SET_IS_FETCHING_MOVIE_INFO,
  SET_MOVIE_CAST,
  SET_MOVIE_INFO,
  SET_RECOMMENDATION_MOVIES
} from "./movieInfoTypes";
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

export const setRecommendationMovies = (movies) => ({
  type: SET_RECOMMENDATION_MOVIES,
  payload: movies,
});

export const setIsFetchingMovieInfo = (isFetchingMovieInfo) => ({
  type: SET_IS_FETCHING_MOVIE_INFO,
  payload: isFetchingMovieInfo,
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

export const fetchRecommenationMovies = (url) => {
  return async (dispatch) => {
    await fetchFromAPI(url)
      .then(movies => {
        dispatch(setRecommendationMovies(movies.results));
      }).catch(error => {
        alert(error.message);
      });
  };
};

