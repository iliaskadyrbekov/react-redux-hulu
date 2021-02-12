import React, {useEffect} from "react";
import {API_GET_SEARCH_MOVIES, fetchFromAPI} from "../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {
  setCountSearchPage,
  setEmptySearchMovies,
  setIsSearching,
  setIsSearchLoaderActive,
  setQueryValue,
  setSearchMovies,
  setTotalMovies
} from "../../redux/search/searchActionCreator";
import searchLoader from '../../assets/img/searchLoder.svg';
import {setIsFiltering} from "../../redux/filters/filtersActionCreator";


const Search = () => {
  const dispatch = useDispatch();
  const {queryValue, isSearchLoaderActive} = useSelector(({searchReducer}) => searchReducer);

  const loaderStyles = {
    backgroundImage: `url(${searchLoader})`,
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
  };

  useEffect(() => {
    async function fetchFirstMovies () {
      const formatQueryValue = queryValue.trim().toLowerCase(); // ??? is it need?
      if (formatQueryValue) {
        await fetchFromAPI(`${API_GET_SEARCH_MOVIES}&page=1&query=${formatQueryValue}`)
          .then(movies => {
            const {total_results} = movies;
            dispatch(setTotalMovies(total_results));
            dispatch(setSearchMovies(movies.results));
          })
      } else { // will enter at the first rendering and when deleting last input char
        dispatch(setIsSearching(false)); // to show all movies when deleting last input char
      }
      dispatch(setIsSearchLoaderActive(false)); // deactivate search loader
    }
    fetchFirstMovies().then();
  }, [dispatch, queryValue]);

  const searchMoviesByQuery = (event) => {
    dispatch(setEmptySearchMovies([]));
    dispatch(setCountSearchPage(2));
    dispatch(setIsSearchLoaderActive(true)); // activate search loader
    dispatch(setQueryValue(event.target.value)); // change value of input
    dispatch(setIsSearching(true)); // set searching view mode
    dispatch(setIsFiltering(false));
  }

  const styles = isSearchLoaderActive ? loaderStyles : {};
  // const styles = loaderStyles;
  // console.log(isSearchLoaderActive)

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
