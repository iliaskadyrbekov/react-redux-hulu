import {
  SET_COUNT_SEARCH_PAGE,
  SET_FIRST_SEARCH_MOVIES,
  SET_IS_SEARCHING,
  SET_IS_SEARCHING_LOADER_ACTIVE,
  SET_QUERY_VALUE,
  SET_SEARCH_MOVIES,
  SET_TOTAL_MOVIES
} from "./searchTypes";
import {fetchFromAPI} from "../../api/fetchAPI";

export const fetchFirstMovies = (url) => {
  return async (dispatch) => {
    await fetchFromAPI(url)
      .then(movies => {
        const {total_results, results} = movies;
        dispatch(setFirstSearchMovies(results));
        dispatch(setIsSearchLoaderActive(false));
        dispatch(setTotalMovies(total_results));
      })
      .catch(error => {
        console.error(error.message);
      });
  };
};

export const setSearchMovies = (searchMovies) => ({
  type: SET_SEARCH_MOVIES,
  payload: searchMovies,
});

export const setCountSearchPage = (countSearchPage) => ({
  type: SET_COUNT_SEARCH_PAGE,
  payload: countSearchPage,
});

export const setTotalMovies = (totalMovies) => ({
  type: SET_TOTAL_MOVIES,
  payload: totalMovies,
});

export const setFirstSearchMovies = (searchMovies) => ({
  type: SET_FIRST_SEARCH_MOVIES,
  payload: searchMovies,
});

export const setIsSearching = (isSearching) => ({
  type: SET_IS_SEARCHING,
  payload: isSearching,
});

export const setQueryValue = (queryValue) => ({
  type: SET_QUERY_VALUE,
  payload: queryValue,
});

export const setIsSearchLoaderActive = (isSearchLoaderActive) => ({
  type: SET_IS_SEARCHING_LOADER_ACTIVE,
  payload: isSearchLoaderActive,
});

