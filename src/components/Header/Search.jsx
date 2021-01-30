import React, {useEffect, useState} from "react";
import {API_GET_SEARCH_MOVIES} from "../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {setEmptySearchMovies, setIsSearching, setQueryValue, setSearchMovies} from "../../redux/actions/search";
import searchLoader from '../../assets/img/searchLoder.svg';

const Search = () => {
  const dispatch = useDispatch();
  const queryValue = useSelector(({searchReducer}) => searchReducer.queryValue);

  const [isLoadedSearchMovies, setIsLoadedSearchMovies] = useState(true);

  const loaderStyles = {
    backgroundImage: `url(${searchLoader})`,
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
  };

  useEffect(() => {
    async function fetchData() {
      if (queryValue.trim()) {
        const response = await fetch(API_GET_SEARCH_MOVIES + '&page=1&query=' + queryValue.trim());
        const json = await response.json();
        console.log('here')
        dispatch(setSearchMovies(json.results));
      } else {
        dispatch(setIsSearching(false));
        dispatch(setEmptySearchMovies([]));
        dispatch(setQueryValue(' '));
      }
      setIsLoadedSearchMovies(true);
    }

    fetchData().then();
  }, [queryValue]);

  const searchMoviesByQuery = (event) => {
    setIsLoadedSearchMovies(false);
    dispatch(setQueryValue(event.target.value));
    dispatch(setEmptySearchMovies([]));
    if (queryValue) {
      dispatch(setIsSearching(true));
    } else {
      dispatch(setIsSearching(false));
    }
  }

  const styles = !isLoadedSearchMovies ? loaderStyles : {};

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
