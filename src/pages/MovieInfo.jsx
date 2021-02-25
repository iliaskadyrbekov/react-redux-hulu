import React, {useEffect} from "react";
import {useParams} from "react-router";
import {API_GET_MOVIE_BY_ID, API_KEY} from "../api/api";
import {fetchMovieCast, fetchMovieInfo, setMovieCast, setMovieInfo} from "../redux/movieInfo/movieInfoActionCreator";
import {useDispatch, useSelector} from "react-redux";
import {MoviePoster} from "../components/MovieInfo/MoviePoster";
import {Crew} from "../components/MovieInfo/Crew";
import {CrewPopup} from "../components/Popups/CrewPopup";

const MovieInfo = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const isOpenCrewPopup = useSelector(({popups}) => popups.isOpenCrewPopup);
  const movieIdUrl = `${API_GET_MOVIE_BY_ID}${id}`;

  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, [])

  useEffect(() => {
    dispatch(fetchMovieInfo(`${movieIdUrl}?${API_KEY}`));
    return () => {
      if (window.location.pathname === '/') {
        dispatch(setMovieInfo({}));
      }
    };
  }, []);

  useEffect(() => {
    dispatch(fetchMovieCast(`${movieIdUrl}/credits?${API_KEY}`));
    return () => {
      if (window.location.pathname === '/') {
        dispatch(setMovieCast({}));
      }
    }
  }, []);

  return (
    <div className="movie-info">
      <MoviePoster/>
      <div className="container">
        <Crew/>
      </div>
      {isOpenCrewPopup && <CrewPopup/>}
    </div>
  );
};

export default MovieInfo;

