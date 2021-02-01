import React, {useEffect, useState} from "react";
import Movie from "./Movie";
import {useDispatch, useSelector} from "react-redux";
import {setCountPage, setGenres, setMovies} from "../../redux/actions/movies";
import {API_GET_GENRES, API_GET_MOVIES, API_GET_SEARCH_MOVIES, fetchFromAPI} from "../../api/api";
import Loader from "./Loader";
import {setCountSearchPage, setSearchMovies} from "../../redux/actions/search";

const ListMovies = () => {
  const dispatch = useDispatch();
  const genres = useSelector(({moviesReducer}) => moviesReducer.genres);
  const movies = useSelector(({moviesReducer}) => moviesReducer.movies);
  const searchMovies = useSelector(({searchReducer}) => searchReducer.searchMovies);
  const isSearching = useSelector(({searchReducer}) => searchReducer.isSearching);
  const queryValue = useSelector(({searchReducer}) => searchReducer.queryValue);
  let countSearchPage = useSelector(({searchReducer}) => searchReducer.countSearchPage);
  let countPage = useSelector(({moviesReducer}) => moviesReducer.countPage);

  const [isFetchingMovies, setIsFetchingMovies] = useState(false);

  useEffect(() => {
    setIsFetchingMovies(true);
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
    window.addEventListener('scroll', handleScroll);

    if (isFetchingMovies) {
      const url = isSearching
        ? `${API_GET_SEARCH_MOVIES}&page=${countSearchPage}&query=${queryValue.trim()}`
        : `${API_GET_MOVIES}&page=${countPage}`; // TODO

      fetchFromAPI(url)
        .then(movies => {
          const {results} = movies;
          if (isSearching) {
            dispatch(setSearchMovies(results));
            dispatch(setCountSearchPage(++countSearchPage));
          } else {
            dispatch(setMovies(results));
            dispatch(setCountPage(++countPage));
          }
          setIsFetchingMovies(false);
        })
        .catch(error => {
          console.log(error.message)
        });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetchingMovies]);

  const handleScroll = () => {
    const viewportHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollTop;
    const documentHeight = document.documentElement.offsetHeight;
    const totalHeight = viewportHeight + scrollHeight + 30;
    if (totalHeight >= documentHeight && documentHeight + 30 >= totalHeight) {
      setIsFetchingMovies(true);
    }
  };

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

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



