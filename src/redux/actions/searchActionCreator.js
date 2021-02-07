export const setSearchMovies = (searchMovies) => ({
  type: 'SET_SEARCH_MOVIES',
  payload: searchMovies,
});

export const setCountSearchPage = (countSearchPage) => ({
  type: 'SET_COUNT_SEARCH_PAGE',
  payload: countSearchPage,
});

export const setTotalMovies = (totalMovies) => ({
  type: 'SET_TOTAL_MOVIES',
  payload: totalMovies,
});

export const setEmptySearchMovies = (searchMovies) => ({
  type: 'SET_EMPTY_SEARCH_MOVIES',
  payload: searchMovies,
});

export const setIsSearching = (isSearching) => ({
  type: 'SET_IS_SEARCHING',
  payload: isSearching,
});

export const setQueryValue = (queryValue) => ({
  type: 'SET_QUERY_VALUE',
  payload: queryValue,
});

export const setIsSearchLoaderActive = (isSearchLoaderActive) => ({
  type: 'SET_IS_SEARCHING_LOADER_ACTIVE',
  payload: isSearchLoaderActive,
});

