import React, {useEffect} from "react";
import {Header} from "./Header";
import {Route} from 'react-router-dom';
import {Home, MovieInfo} from "../pages";
import {useDispatch} from "react-redux";
import {fetchGenres, setIsFetchingMovies} from "../redux/movies/moviesActionCreator";

function App() {
  const dispatch = useDispatch();
  //TODO
  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setIsFetchingMovies(true));
  }, [dispatch]);

  return (
    <>
      <Header/>
      <Route path="/" component={Home} exact/>
      <Route path="/movies/:id" component={MovieInfo} exact/>
    </>
  );
}

export default App;

