const initialState = {
  searchMovies: [],
  isSearching: false,
  queryValue: '',
  countSearchPage: 2,
  totalMovies: 0,
  isSearchLoaderActive: false,
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
    case 'SET_EMPTY_SEARCH_MOVIES':
      return {
        ...state,
        searchMovies: action.payload,
      };
    case 'SET_TOTAL_MOVIES':
      return {
        ...state,
        totalMovies: action.payload,
      };
    case 'SET_COUNT_SEARCH_PAGE':
      return {
        ...state,
        countSearchPage: action.payload,
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
    case 'SET_IS_SEARCHING_LOADER_ACTIVE':
      return {
        ...state,
        isSearchLoaderActive: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;

