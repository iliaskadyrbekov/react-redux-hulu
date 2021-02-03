import React, {useEffect} from "react";
import {API_GET_SEARCH_MOVIES} from "../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {
  setCountSearchPage,
  setEmptySearchMovies,
  setIsSearching,
  setIsSearchLoaderActive,
  setQueryValue,
  setSearchMovies,
  setTotalMovies
} from "../../redux/actions/search";
import searchLoader from '../../assets/img/searchLoder.svg';

const Search = () => {
  const dispatch = useDispatch();
  const queryValue = useSelector(({searchReducer}) => searchReducer.queryValue);
  const isSearchLoaderActive = useSelector(({searchReducer}) => searchReducer.isSearchLoaderActive);

  const loaderStyles = {
    backgroundImage: `url(${searchLoader})`,
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
  };

  useEffect(() => {
    async function fetchData() {
      const formatQueryValue = queryValue.trim().toLowerCase(); // ??? is it need?
      if (formatQueryValue) {
        const response = await fetch(`${API_GET_SEARCH_MOVIES}&page=1&query=${formatQueryValue}`);
        const json = await response.json();
        const {total_results} = json;
        dispatch(setTotalMovies(total_results));
        dispatch(setSearchMovies(json.results));
      } else { // will enter at the first rendering and when deleting last input char
        dispatch(setIsSearching(false)); // to show all movies when deleting last input char
      }
      dispatch(setIsSearchLoaderActive(false)); // deactivate search loader
    }

    fetchData().then(); // TODO
  }, [dispatch, queryValue]);

  const searchMoviesByQuery = (event) => {
    dispatch(setEmptySearchMovies([]));
    dispatch(setCountSearchPage(2));
    dispatch(setIsSearchLoaderActive(true)); // activate search loader
    dispatch(setQueryValue(event.target.value)); // change value of input
    dispatch(setIsSearching(true)); // set searching view mode
  }

  const styles = isSearchLoaderActive ? loaderStyles : {};

  return (
    <div className="search">
      <input className="search__input"
             type="search"
             onChange={searchMoviesByQuery}
             value={queryValue}
             style={styles}
             maxLength={50}
      />
    </div>
  )
};

export default Search;
