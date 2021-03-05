import React, {useEffect} from "react";
import {useParams} from "react-router";
import {API_GET_MOVIE_BY_ID, API_KEY} from "../api/api";
import {
  fetchMovieCast,
  fetchMovieInfo,
  fetchRecommenationMovies,
  setMovieCast,
  setMovieInfo,
  setRecommendationMovies
} from "../redux/movieInfo/movieInfoActionCreator";
import {useDispatch, useSelector} from "react-redux";
import {MoviePoster} from "../components/MovieInfo/MoviePoster";
import {Crew} from "../components/MovieInfo/Crew";
import {MovieControl} from "../components/MovieInfo/MovieControl";
import {RecommendationMovies} from "../components/MovieInfo/RecommendationMovies";

const MovieInfo = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const recommendationMovies = useSelector(({movieInfo}) => movieInfo.recommendationMovies);

  const movieIdURL = `${API_GET_MOVIE_BY_ID}${id}`;
  const movieCrewURL = `/movies/${id}/crew`;

  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, [id]);

  useEffect(() => {
    dispatch(fetchMovieInfo(`${movieIdURL}?${API_KEY}`));
    return () => {
      if (window.location.pathname !== movieCrewURL) {
        dispatch(setMovieInfo({}));
      }
    };
  }, [id]);

  useEffect(() => {
    dispatch(fetchMovieCast(`${movieIdURL}/credits?${API_KEY}`));
    return () => {
      if (window.location.pathname !== movieCrewURL) {
        dispatch(setMovieCast({}));
      }
    }
  }, [id]);

  useEffect(() => {
    const url = `${movieIdURL}/recommendations?${API_KEY}&page=1`;
    dispatch(fetchRecommenationMovies(url));
    return () => {
      if (window.location.pathname !== movieCrewURL) {
        dispatch(setRecommendationMovies([]));
      }
    };
  }, [id]);

  return (
    <div className="movie-info">
      <MoviePoster/>
      <div className="container">
        <MovieControl/>
        <Crew/>
        {recommendationMovies.length !== 0 && <RecommendationMovies/>}
      </div>
    </div>
  );
};

export default MovieInfo;

