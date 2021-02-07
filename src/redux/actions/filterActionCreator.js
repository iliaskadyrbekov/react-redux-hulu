export const setCurrentSortBy = (sortBy) => ({
  type: 'SET_CURRENT_SORT_BY',
  payload: sortBy,
});

export const addCheckedGenre = (id) => ({
  type: 'ADD_CHECKED_GENRE',
  payload: id,
});

export const setCheckedGenres = (checkedGenres) => ({
  type: 'SET_CHECKED_GENRES',
  payload: checkedGenres,
});



