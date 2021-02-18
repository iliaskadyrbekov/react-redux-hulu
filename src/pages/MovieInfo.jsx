/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import {useParams} from "react-router";
import {API_GET_MOVIE_BY_ID, API_KEY} from "../api/api";
import {fetchMovieInfo, setMovieInfo} from "../redux/movieInfo/movieInfoActionCreator";
import {useDispatch, useSelector} from "react-redux";

const MovieInfo = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {
    title, poster_path, release_date, original_language,genres,runtime,
  } = useSelector(({movieInfoReducer}) => movieInfoReducer.movieInfo);

  useEffect(() => {
    dispatch(fetchMovieInfo(`${API_GET_MOVIE_BY_ID}${id}?${API_KEY}`));
    return () => {
      dispatch(setMovieInfo({}));
    };
  }, []);

  const formatGenres = genres && genres.map(genre => genre.name).join(', ');
  const formatCountryName = original_language && original_language.toUpperCase();
  const formatRuntime = () => {
    const hours = Math.trunc(runtime / 60);
    const minutes = runtime - hours * 60;
    if (hours < 1) return `${minutes}m`
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="movie-info">
      <section className="movie-info__header">
        <img className="movie-info__image" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt=""/>
        <div className="movie-info__main-content">
          <div className="movie-info__main-content-header">
            <h1 className="movie-info__title">{title}</h1>
            <div className="movie-info__subtitle-details">
              <span className="movie-info__date">{release_date}</span>
              <span  className="movie-info__country">({formatCountryName})</span>
              <span className="movie-info__genres">{formatGenres}</span>
              <span className="movie-info__runtime">{formatRuntime()}</span>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieInfo;

