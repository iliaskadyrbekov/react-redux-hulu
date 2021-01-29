import React, {useEffect, useState} from "react";
import {API_GET_SEARCH_MOVIES} from "../../api/api";
import {useDispatch} from "react-redux";
import {setIsSearching, setSearchMovies} from "../../redux/actions/search";
import searchLoader from '../../assets/img/searchLoder.svg';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(' ');
  const [isLoadedSearchMovies, setIsLoadedSearchMovies] = useState(true);

  const loaderStyles = {
    backgroundImage: `url(${searchLoader})`,
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
  };

  useEffect(() => {
    async function fetchData() {
      if (value.trim()) {
        const response = await fetch(API_GET_SEARCH_MOVIES + value);
        const json = await response.json();
        dispatch(setSearchMovies(json.results));
      } else {
        dispatch(setIsSearching(false));
        dispatch(setSearchMovies([]));
        setValue(' ');
      }
      setIsLoadedSearchMovies(true);
    }

    fetchData().then();
  }, [value]);//TODO

  const searchMoviesByQuery = (event) => {
    setIsLoadedSearchMovies(false);
    const inputValue = event.target.value;
    setValue(inputValue);
    if (value) {
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
             value={value}
             style={styles}
             maxLength={50}
      />
    </div>
  )
};

export default Search;

