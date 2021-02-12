import {
  SET_COUNT_PAGE,
  SET_EMPTY_MOVIES,
  SET_GENRES,
  SET_IS_FETCHING_M0VIES,
  SET_MOVIES
} from "./moviesTypes";

export const setMovies = (movies) => ({
  type: SET_MOVIES,
  payload: movies,
});

export const setIsFetchingMovies = (isFetchingMovies) => ({
  type: SET_IS_FETCHING_M0VIES,
  payload: isFetchingMovies,
});

export const setEmptyMovies = (movies) => ({
  type: SET_EMPTY_MOVIES,
  payload: movies,
});

export const setGenres = (genres) => ({
  type: SET_GENRES,
  payload: genres,
});

export const setCountPage = (countPage) => ({
  type: SET_COUNT_PAGE,
  payload: countPage,
});



