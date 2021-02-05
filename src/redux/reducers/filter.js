const initialState = {
  currentSortBy: {'popularity.desc': 'Popular'},
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_SORT_BY':
      return {
        ...state,
        currentSortBy: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;

