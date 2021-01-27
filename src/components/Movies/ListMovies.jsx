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

  const [isFetching, setIsFetching] = useState(false);
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
  }, []);

  useEffect(() => {
    if (isFetching) {
      fetchMoreMovies().then();
    }
  }, [isFetching]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 20 >= document.documentElement.offsetHeight) {
      setIsFetching(true);
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
    setIsFetching(false);
  };

  const moviesFormat = movies.map((movie) => { // TODO key unique logic
    return movie.backdrop_path && <Movie
      movie={movie}
      key={movie.id}
      genres={genres}
    />
  });

  return (
    <div className="movies">
      <div className="movies__list">
        {moviesFormat}
      </div>
      <div className="movies__loader">
        {isFetching && <Loader/>}
      </div>
    </div>
  )
};

export default ListMovies;



