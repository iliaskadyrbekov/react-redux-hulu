import React, {useEffect} from "react";
import {Header} from "./Header";
import {Route} from 'react-router-dom';
import {Home, MovieDetails} from "../pages";
import {useDispatch} from "react-redux";
import {fetchGenres, setIsFetchingMovies} from "../redux/movies/moviesActionCreator";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setIsFetchingMovies(true));
  }, [dispatch]);

  return (
    <>
      <Header/>
      <div className="container">
        <Route path="/" component={Home} exact/>
        <Route path="/movies/:id" component={MovieDetails} exact/>
      </div>
    </>
  );
}

export default App;

