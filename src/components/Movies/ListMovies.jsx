import React, {useEffect} from "react";
import Movie from "./Movie";
import {useDispatch, useSelector} from "react-redux";
import {setMovies} from "../../redux/actions/movies";

const ListMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector(({moviesReducer}) => moviesReducer.movies);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=a61257ecae454cfad5f5d6150af43761')
      .then(res => res.json())
      .then((data) => {
          dispatch(setMovies(data.results));
        },
      )
  }, []);

  const moviesFormat = movies.map((movie) => <Movie movie={movie} key={movie.id} />);

  return (
    <div className="movies">
      {moviesFormat}
    </div>
  )
};


export default ListMovies;



