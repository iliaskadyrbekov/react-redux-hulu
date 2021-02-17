/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import Movie from "./Movie/Movie";
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies, setIsFetchingMovies} from "../../redux/movies/moviesActionCreator";
import {API_GET_MOVIES, API_GET_SEARCH_MOVIES} from "../../api/api";
import Loader from "./Loader";

const ListMovies = () => {
  const dispatch = useDispatch();
  let {
    genres, movies, isFetchingMovies, countPage
  } = useSelector(({moviesReducer}) => moviesReducer);
  let {
    searchMovies, isSearching, queryValue, totalMovies, isSearchLoaderActive, countSearchPage
  } = useSelector(({searchReducer}) => searchReducer);
  const sortByKey = useSelector(({filtersReducer}) => Object.keys(filtersReducer.currentSortBy)[0]);
  const {checkedFilters, isFiltering} = useSelector(({filtersReducer}) => filtersReducer);

  useEffect(() => {
    if (isFetchingMovies) {
      if (isSearching) {
        const formatQueryValue = queryValue.trim().toLowerCase();
        if (!formatQueryValue) return;
        dispatch(fetchMovies(`${API_GET_SEARCH_MOVIES}&page=${countSearchPage}&query=${formatQueryValue}`));
      } else {
        dispatch(fetchMovies(`${API_GET_MOVIES}&page=${countPage}&sort_by=${sortByKey}${filterGenresURL()}${filterYearsURL()}`));
      }
    }
  }, [isFetchingMovies, queryValue]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetchingMovies, totalMovies, isSearching]);

  const isNotLastMovies = () => {
    const currentCountMovies = isSearching ? searchMovies.length : movies.length;
    return currentCountMovies < totalMovies;
  };

  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollTop;
    const documentHeight = document.documentElement.offsetHeight;
    const totalHeight = viewportHeight + scrollHeight + 50;
    if (isNotLastMovies() && totalHeight >= documentHeight && documentHeight + 60 >= totalHeight) {
      dispatch(setIsFetchingMovies(true));
    }
  };

  const filterGenresURL = () => {
    const {checkedGenres} = checkedFilters;
    if (!checkedGenres.length) {
      return '';
    }
    return '&with_genres=' + checkedGenres.join((' ').replaceAll(' ', ','));
  };

  const filterYearsURL = () => {
    const {checkedYears} = checkedFilters;
    const [selectedYears] = checkedYears;
    if (!selectedYears) return '';
    if (typeof selectedYears === 'string') {
      if (selectedYears.indexOf('-') === -1) return `&year=1950`;
      const [beginYear, endYear] = selectedYears.split('-');
      return `&primary_release_date.gte=${beginYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
    }
    return '&primary_release_year=' + selectedYears;
  };

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  const showNotFoundMessage = () => {
    return <div className="movies__message">Nothing found</div>;
  };

  const resultMovies = (movies) => {
    return movies && movies.map((movie, index) => { // TODO key unique logic
      return <Movie //TODO
        movie={movie}
        key={index}
        genres={genres}
      />
    });
  };

  return (
    <section className="movies">
      {!searchMovies.length && !isSearchLoaderActive && isSearching && showNotFoundMessage()}
      {!movies.length && isFiltering && !isFetchingMovies && showNotFoundMessage()}
      <div className="movies__list">
        {!isSearching ? resultMovies(movies) : resultMovies(searchMovies)}
      </div>
      <div className="movies__loader">
        {isFetchingMovies && <Loader/>}
      </div>
    </section>
  )
};

export default ListMovies;



