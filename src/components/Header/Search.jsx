/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchFirstMovies,
  setCountSearchPage,
  setFirstSearchMovies,
  setIsSearching,
  setIsSearchLoaderActive,
  setQueryValue
} from "../../redux/search/searchActionCreator";
import searchLoader from '../../assets/img/searchLoder.svg';
import {API_GET_SEARCH_MOVIES} from "../../api/api";
import {useHistory} from "react-router";

const Search = () => {
  const dispatch = useDispatch();
  const {queryValue, isSearchLoaderActive} = useSelector(({search}) => search);
  let history = useHistory();

  const loaderStyles = {
    backgroundImage: `url(${searchLoader})`,
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
  };

  useEffect(() => {
    window.scrollTo({
      top: 0
    });
    const formatQueryValue = queryValue.trim().toLowerCase();
    if (formatQueryValue) {
      dispatch(fetchFirstMovies(`${API_GET_SEARCH_MOVIES}&page=1&query=${formatQueryValue}`));
    } else {
      dispatch(setIsSearching(false));
      dispatch(setIsSearchLoaderActive(false));
      dispatch(setFirstSearchMovies([]));
    }
  }, [queryValue]);

  const searchMoviesByQuery = (event) => {
    history.push("/");
    dispatch(setQueryValue(event.target.value));
    dispatch(setIsSearching(true));
    dispatch(setIsSearchLoaderActive(true));
    dispatch(setCountSearchPage(2));
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();
  };

  const styles = isSearchLoaderActive ? loaderStyles : {};

  return (
    <form className="search" onSubmit={searchSubmitHandler}>
      <input
        className="search__input"
        type="search"
        onChange={searchMoviesByQuery}
        value={queryValue}
        style={styles}
        maxLength={50}
        placeholder="Enter movies name"
      />
    </form>
  )
};

export default Search;
