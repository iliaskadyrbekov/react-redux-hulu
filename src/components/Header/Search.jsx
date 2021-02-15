/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  setCountSearchPage,
  setEmptySearchMovies,
  setIsSearching,
  setIsSearchLoaderActive,
  setQueryValue
} from "../../redux/search/searchActionCreator";
import searchLoader from '../../assets/img/searchLoder.svg';
import {setIsFetchingMovies} from "../../redux/movies/moviesActionCreator";

const Search = () => {
  const dispatch = useDispatch();
  const {queryValue, isSearchLoaderActive} = useSelector(({searchReducer}) => searchReducer);

  const loaderStyles = {
    backgroundImage: `url(${searchLoader})`,
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
  };

  const searchMoviesByQuery = (event) => {
    dispatch(setQueryValue(event.target.value)); // change value of input
    dispatch(setIsSearching(true));
    dispatch(setCountSearchPage(1));
    dispatch(setEmptySearchMovies([]));
    dispatch(setIsFetchingMovies(true));
    dispatch(setIsSearchLoaderActive(true));
  };

  const styles = isSearchLoaderActive ? loaderStyles : {};

  return (
    <div className="search">
      <input
        className="search__input"
        type="search"
        onChange={searchMoviesByQuery}
        value={queryValue}
        style={styles}
        maxLength={50}
        placeholder="Enter movies name"
      />
    </div>
  )
};

export default Search;
