/* eslint-disable react-hooks/exhaustive-deps */ //TODO
import React, {useEffect, useState} from "react";
import Movie from "./Movie";
import {useDispatch, useSelector} from "react-redux";
import {setGenres, setMovies} from "../../redux/actions/movies";
import {API_GET_GENRES, API_GET_MOVIES} from "../../api/api";
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
    window.addEventListener('scroll', handleScroll);
    fetch(`${API_GET_MOVIES}&page=${pageId}`)
      .then(res => res.json())
      .then((data) => {
          dispatch(setMovies(data.results));
        },
      );
    setPageId(++pageId);
    fetch(API_GET_GENRES)
      .then(response => response.json())
      .then(data => {
        dispatch(setGenres(data.genres))
      });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);// TODO

  useEffect(() => {
    if (isFetchingMovies) {
      fetchMoreMovies().then();
    }
  }, [isFetchingMovies]);//TODO

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 20 >= document.documentElement.offsetHeight) {
      setIsFetchingMovies(true);
    }
  };

  const fetchMoreMovies = async () => {
    try {
      await fetch(`${API_GET_MOVIES}&page=${pageId}`)
        .then(res => res.json()).then((data) => {
          dispatch(setMovies(data.results));
        });
    } catch (error) {
      console.log(error);
    }
    setPageId(++pageId);
    setIsFetchingMovies(false);
  };

  const resultMovies = (movies) => {
    return movies && movies.map((movie) => { // TODO key unique logic
      return movie.backdrop_path && <Movie
        movie={movie}
        key={movie.id}
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



