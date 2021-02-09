/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import Movie from "./Movie";
import {useDispatch, useSelector} from "react-redux";
import {setCountPage, setGenres, setIsFetchingMovies, setMovies} from "../../redux/actions/moviesActionCreator";
import {API_GET_GENRES, API_GET_MOVIES, API_GET_SEARCH_MOVIES, fetchFromAPI} from "../../api/api";
import Loader from "./Loader";
import {setCountSearchPage, setSearchMovies, setTotalMovies} from "../../redux/actions/searchActionCreator";

const ListMovies = () => {
  const dispatch = useDispatch();
  const genres = useSelector(({moviesReducer}) => moviesReducer.genres);
  const movies = useSelector(({moviesReducer}) => moviesReducer.movies);
  const searchMovies = useSelector(({searchReducer}) => searchReducer.searchMovies);
  const isSearching = useSelector(({searchReducer}) => searchReducer.isSearching);
  const queryValue = useSelector(({searchReducer}) => searchReducer.queryValue);
  const totalMovies = useSelector(({searchReducer}) => searchReducer.totalMovies);
  let countSearchPage = useSelector(({searchReducer}) => searchReducer.countSearchPage);
  let countPage = useSelector(({moviesReducer}) => moviesReducer.countPage);
  const isFetchingMovies = useSelector(({moviesReducer}) => moviesReducer.isFetchingMovies);
  const isSearchLoaderActive = useSelector(({searchReducer}) => searchReducer.isSearchLoaderActive);
  const sortByKey = useSelector(({filterReducer}) => Object.keys(filterReducer.currentSortBy)[0]);
  const checkedFilters = useSelector(({filterReducer}) => filterReducer.checkedFilters);
  const isFiltering = useSelector(({filterReducer}) => filterReducer.isFiltering);

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
        : `${API_GET_MOVIES}&page=${countPage}&sort_by=${sortByKey}${filterGenresURL()}`;
      //&primary_release_date.gte=2013-01-01&primary_release_date.lte=2015-01-01

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
          console.log(error.message)
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
    const totalHeight = viewportHeight + scrollHeight + 30;
    if (isNotLastMovies() && totalHeight >= documentHeight && documentHeight + 40 >= totalHeight) {
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



