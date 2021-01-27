const initialState = {
  movies: [],
  genres: [],
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { // TODO
        ...state,
        movies: [
          ...state.movies,
          ...action.payload,
        ]
      };
    case 'SET_GENRES':
      return {
        ...state,
        genres: action.payload,
      };
    default:
      return state;
  }
};

export default moviesReducer;

