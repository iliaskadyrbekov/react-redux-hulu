import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchFirstMovies,
  setCountSearchPage,
  setFirstSearchMovies,
  setIsSearching,
  setIsSearchLoaderActive,
  setQueryValue, setTotalMovies
} from "../../redux/search/searchActionCreator";
import searchLoader from '../../assets/img/searchLoder.svg';
import {API_GET_SEARCH_MOVIES} from "../../api/api";
import {useHistory} from "react-router";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Search = () => {
  const dispatch = useDispatch();
  const {queryValue, isSearchLoaderActive} = useSelector(({search}) => search);
  const [isVisibleClearBtn, setIsVisibleClearBtn] = useState(false);
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
      setIsVisibleClearBtn(false);
    }
  }, [queryValue]);

  const searchMoviesByQuery = (event) => {
    history.push("/");
    dispatch(setQueryValue(event.target.value));
    dispatch(setIsSearching(true));
    dispatch(setIsSearchLoaderActive(true));
    dispatch(setCountSearchPage(2));
    setIsVisibleClearBtn(true);
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();
  };

  const styles = isSearchLoaderActive ? loaderStyles : {};

  const onClearSearchInput = () => {
    dispatch(setQueryValue(''));
    dispatch(setCountSearchPage(2));
    dispatch(setTotalMovies(10000));
  };

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
      {isVisibleClearBtn &&
      <button className="search__button-clear">
        <HighlightOffIcon
          className="search__button-icon"
          style={{fontSize: 38}}
          onClick={onClearSearchInput}
        />
      </button>}
    </form>
  )
};

export default Search;
