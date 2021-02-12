/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import Movie from "./Movie/Movie";
import {useDispatch, useSelector} from "react-redux";
import {
  setCountPage, setGenres,
  setIsFetchingMovies, setMovies
} from "../../redux/movies/moviesActionCreator";
import {API_GET_GENRES, API_GET_MOVIES, API_GET_SEARCH_MOVIES, fetchFromAPI} from "../../api/api";
import Loader from "./Loader";
import {setCountSearchPage, setSearchMovies, setTotalMovies} from "../../redux/search/searchActionCreator";

const ListMovies = () => {
  const dispatch = useDispatch();
  let {
    genres, movies, isFetchingMovies, countPage
  } = useSelector(({moviesReducer}) => moviesReducer);
  let {
    searchMovies, isSearching, queryValue, totalMovies, isSearchLoaderActive, countSearchPage
  } = useSelector(({searchReducer}) => searchReducer);
  const sortByKey = useSelector(({filterReducer}) => Object.keys(filterReducer.currentSortBy)[0]);
  const {checkedFilters, isFiltering} = useSelector(({filterReducer}) => filterReducer);

  useEffect(() => {
    dispatch(setIsFetchingMovies(true));
  }, []);

  useEffect(() => {
    fetchFromAPI(API_GET_GENRES)
      .then(genresList => {
        const {genres} = genresList;
        dispatch(setGenres(genres));
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [dispatch]);

  useEffect(() => {
    if (isFetchingMovies) {
      const url = isSearching
        ? `${API_GET_SEARCH_MOVIES}&page=${countSearchPage}&query=${queryValue.trim()}`
        : `${API_GET_MOVIES}&page=${countPage}&sort_by=${sortByKey}${filterGenresURL()}${filterYearsURL()}`;

      fetchFromAPI(url)
        .then(movies => {
          const {results, total_results} = movies;
          if (isSearching) {
            dispatch(setSearchMovies(results));
            dispatch(setCountSearchPage(++countSearchPage));
          } else {
            dispatch(setMovies(results));
            dispatch(setCountPage(++countPage));
          }
          dispatch(setTotalMovies(total_results));
          dispatch(setIsFetchingMovies(false));
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }, [isFetchingMovies]);

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

  const notFoundMessage = () => {
    return <div className="movies__message">Nothing found</div>;
  };

  const resultMovies = (movies) => {
    return movies && movies.map((movie) => { // TODO key unique logic
      const {id} = movie;
      // if (isFetchingMovies) {
      //   return <MovieTemplate
      //     key={id}
      //   />;
      // } else {
      return <Movie //TODO
        movie={movie}
        key={id}
        genres={genres}
      />
      // }
    });
  };

  // console.log(searchMovies.length, !isSearchLoaderActive, isSearching);

  return (
    <section className="movies">
      {!searchMovies.length && !isSearchLoaderActive && isSearching && notFoundMessage()}
      {!movies.length && isFiltering && !isFetchingMovies && notFoundMessage()}
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



