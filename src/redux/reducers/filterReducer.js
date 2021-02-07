const initialState = {
  currentSortBy: {'popularity.desc': 'Popular'},
  checkedGenres: [],
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_SORT_BY':
      return {
        ...state,
        currentSortBy: action.payload,
      };
    case 'ADD_CHECKED_GENRE':
      return {
        ...state,
        checkedGenres: [...state.checkedGenres, action.payload],
      };
    case 'SET_CHECKED_GENRES':
      return {
        ...state,
        checkedGenres: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;

