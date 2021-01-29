/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import Movie from "./Movie";
import {useDispatch, useSelector} from "react-redux";
import {setGenres, setMovies} from "../../redux/actions/movies";
import {API_GET_GENRES, API_GET_MOVIES, fetchFromAPI} from "../../api/api";
import Loader from "./Loader";

const ListMovies = () => {
  const dispatch = useDispatch();
  const genres = useSelector(({moviesReducer}) => moviesReducer.genres);
  const movies = useSelector(({moviesReducer}) => moviesReducer.movies);
  const searchMovies = useSelector(({searchReducer}) => searchReducer.searchMovies);
  const isSearching = useSelector(({searchReducer}) => searchReducer.isSearching);

  const [isFetchingMovies, setIsFetchingMovies] = useState(false);
  let [pageId, setPageId] = useState(1);

  useEffect(() => {
    setIsFetchingMovies(true);
  }, [])

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
      fetchFromAPI(`${API_GET_MOVIES}&page=${pageId}`)
        .then(movies => {
          dispatch(setMovies(movies.results));
          setIsFetchingMovies(false);
          setPageId(++pageId);
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
      const {id, backdrop_path} = movie;
      return backdrop_path && <Movie
        movie={movie}
        key={id}
        genres={genres}
      />
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



