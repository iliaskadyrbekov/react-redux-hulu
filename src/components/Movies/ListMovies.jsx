import React, {useEffect, useState} from "react";
import Movie from "./Movie";
import {useDispatch, useSelector} from "react-redux";
import {setCountPage, setGenres, setMovies} from "../../redux/actions/movies";
import {API_GET_GENRES, API_GET_MOVIES, API_GET_SEARCH_MOVIES, fetchFromAPI} from "../../api/api";
import Loader from "./Loader";
import {setCountSearchPage, setSearchMovies} from "../../redux/actions/search";
import {MovieTemplate} from "./index";

const ListMovies = () => {
  const dispatch = useDispatch();
  const genres = useSelector(({moviesReducer}) => moviesReducer.genres);
  const movies = useSelector(({moviesReducer}) => moviesReducer.movies);
  let countPage = useSelector(({moviesReducer}) => moviesReducer.countPage);
  const searchMovies = useSelector(({searchReducer}) => searchReducer.searchMovies);
  const isSearching = useSelector(({searchReducer}) => searchReducer.isSearching);
  const queryValue = useSelector(({searchReducer}) => searchReducer.queryValue);
  let countSearchPage = useSelector(({searchReducer}) => searchReducer.countSearchPage);

  const [isFetchingMovies, setIsFetchingMovies] = useState(false);

  useEffect(() => {
    setIsFetchingMovies(true);
  }, []);

  useEffect(() => {
    fetchFromAPI(API_GET_GENRES)
      .then(genres => {
        dispatch(setGenres(genres.genres));
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (isFetchingMovies) {
      const url = isSearching
        ? API_GET_SEARCH_MOVIES + '&page=' + countSearchPage + '&query=' + queryValue.trim()
        : `${API_GET_MOVIES}&page=${countPage}`;

      fetchFromAPI(url)
        .then(movies => {
          if (isSearching) {
            dispatch(setSearchMovies(movies.results));
            dispatch(setCountSearchPage(++countSearchPage));
          } else {
            dispatch(setMovies(movies.results));
            dispatch(setCountPage(++countPage));
          }
          setIsFetchingMovies(false);
        })
        .catch(error => {
          console.log(error.message)
        });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetchingMovies]);// TODO

  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollTop;
    const documentHeight = document.documentElement.offsetHeight;
    if (viewportHeight + scrollHeight + 10 >= documentHeight) {
      setIsFetchingMovies(true);
    }
  };

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  const resultMovies = (movies) => {
    return movies && movies.map((movie) => { // TODO key unique logic
      const {id} = movie;
      if (isFetchingMovies) {
        return <MovieTemplate/>;
      } else {
        return <Movie //TODO
          movie={movie}
          key={id}
          genres={genres}
        />
      }
    });
  };

  return (
    <div className="movies">
      <div className="movies__list">
        {!isSearching ? resultMovies(movies) : resultMovies(searchMovies)}
      </div>
      <div className="movies__loader">
        {isFetchingMovies && <Loader/>}
      </div>
    </div>
  )
};

export default ListMovies;



