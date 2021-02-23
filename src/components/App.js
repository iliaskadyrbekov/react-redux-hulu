import React, {useEffect} from "react";
import {Header} from "./Header";
import {Route} from 'react-router-dom';
import {Home, MovieInfo} from "../pages";
import {useDispatch} from "react-redux";
import {fetchGenres, setIsFetchingMovies} from "../redux/movies/moviesActionCreator";
import {fetchMovieCast, fetchMovieInfo, setCurrentLocationPath} from "../redux/movieInfo/movieInfoActionCreator";
import {CrewPopup, FilterPopup} from "./Popups";
import {API_GET_MOVIE_BY_ID, API_KEY} from "../api/api";

function App() {
  const dispatch = useDispatch();

  //TODO
  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setIsFetchingMovies(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentLocationPath(window.location.pathname));
  }, []);

  useEffect(() => {
    const id = window.location.pathname.match(/\d+/);
    if (id) {
      const movieIdUrl = `${API_GET_MOVIE_BY_ID}${id}`;
      dispatch(fetchMovieInfo(`${movieIdUrl}?${API_KEY}`));
      dispatch(fetchMovieCast(`${movieIdUrl}/credits?${API_KEY}`));
    }
  }, []);

  return (
    <>
      <Header/>
      <Route path="/" component={Home} exact/>
      <Route path="/movies/:id" component={MovieInfo} exact/>
      <Route path="/movies/:id/crew" component={CrewPopup} exact/>
      <Route path="/filters" component={FilterPopup} exact/>
    </>
  );
}

export default App;

