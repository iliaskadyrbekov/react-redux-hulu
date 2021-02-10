export const setCurrentSortBy = (sortBy) => ({
  type: 'SET_CURRENT_SORT_BY',
  payload: sortBy,
});

export const setCheckedGenres = (checkedGenres) => ({
  type: 'SET_CHECKED_GENRES',
  payload: checkedGenres,
});

export const setCheckedYears = (checkedYears) => ({
  type: 'SET_CHECKED_YEARS',
  payload: checkedYears,
});

export const setIsOpenFilterPopup = (isOpenFilterPopup) => ({
  type: 'SET_IS_OPEN_FILTER_POPUP',
  payload: isOpenFilterPopup,
});

export const setIsFiltering = (isFiltering) => ({
  type: 'SET_IS_FILTERING',
  payload: isFiltering,
});



