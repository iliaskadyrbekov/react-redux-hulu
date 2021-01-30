const initialState = {
  searchMovies: [],
  isSearching: false,
  queryValue: ' ',
  countSearchPage: 1,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_MOVIES':
      return {
        ...state,
        searchMovies: [
          ...state.searchMovies,
          ...action.payload,
        ]
      };
    case 'SET_COUNT_SEARCH_PAGE':
      return {
        ...state,
        countSearchPage: action.type,
      };
    case 'SET_IS_SEARCHING':
      return {
        ...state,
        isSearching: action.payload,
      };
    case 'SET_QUERY_VALUE':
      return {
        ...state,
        queryValue: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;

