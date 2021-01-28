const initialState = {
  searchMovies: [],
  isSearching: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_MOVIES':
      return {
        ...state,
        searchMovies: action.payload
      };
    case 'SET_IS_SEARCHING':
      return {
        ...state,
        isSearching: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;