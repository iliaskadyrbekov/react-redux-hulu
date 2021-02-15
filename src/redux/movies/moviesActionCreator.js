import {SET_COUNT_PAGE, SET_EMPTY_MOVIES, SET_GENRES, SET_IS_FETCHING_M0VIES, SET_MOVIES} from "./moviesTypes";
import {API_GET_GENRES, fetchFromAPI} from "../../api/api";
import {
  setCountSearchPage,
  setIsSearchLoaderActive,
  setSearchMovies,
  setTotalMovies
} from "../search/searchActionCreator";

export const setMovies = (movies) => ({
  type: SET_MOVIES,
  payload: movies,
});

export const setEmptyMovies = (movies) => ({
  type: SET_EMPTY_MOVIES,
  payload: movies,
});

export const setIsFetchingMovies = (isFetchingMovies) => ({
  type: SET_IS_FETCHING_M0VIES,
  payload: isFetchingMovies,
});

export const setGenres = (genres) => ({
  type: SET_GENRES,
  payload: genres,
});

export const setCountPage = (countPage) => ({
  type: SET_COUNT_PAGE,
  payload: countPage,
});

export const fetchGenres = () => dispatch => {
  fetchFromAPI(API_GET_GENRES)
    .then(genresList => {
      const {genres} = genresList;
      dispatch(setGenres(genres));
    })
    .catch(error => {
      alert(error.message);
    });
};

export const fetchMovies = (url) => {
  return async function (dispatch, getState) {
    await fetchFromAPI(url)
      .then(movies => {
        const {results, total_results} = movies;
        let {isSearching, countSearchPage} = getState().searchReducer;
        if (isSearching) {
          dispatch(setSearchMovies(results));
          dispatch(setIsSearchLoaderActive(false)); // deactivate search loader
          dispatch(setCountSearchPage(++countSearchPage));
        } else {
          let {countPage} = getState().moviesReducer;
          dispatch(setMovies(results));
          dispatch(setCountPage(++countPage));
        }
        dispatch(setTotalMovies(total_results));
        dispatch(setIsFetchingMovies(false));
      })
      .catch(error => {
        console.error(error.message);
      });
  }
};




