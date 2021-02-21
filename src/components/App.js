import React, {useEffect} from "react";
import {Header} from "./Header";
import {Route} from 'react-router-dom';
import {Home, MovieInfo} from "../pages";
import {useDispatch} from "react-redux";
import {fetchGenres, setIsFetchingMovies} from "../redux/movies/moviesActionCreator";
import {setCurrentLocationPath} from "../redux/movieInfo/movieInfoActionCreator";
import {CrewPopup, FilterPopup} from "../pages/popups";

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

