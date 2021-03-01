import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Loader} from "../../Loader";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {getCountriesList, getGenresList, getRating} from "../../../utils/formatMovieData";
import {Button} from "../../Button";
import defaultMovieImage from "../../../assets/img/defaultMovieImage.png";

const MoviePoster = () => {
  const {
    title, poster_path, release_date, genres, runtime,
    backdrop_path, tagline, overview, production_countries, vote_average
  } = useSelector(({movieInfo}) => movieInfo.movieInfo);

  const [isFetchingMovieInfo, setIsFetchingMovieInfo] = useState(true);

  const formatReleaseDate = release_date && release_date.split('-').reverse().join('/');
  const backdropPath = backdrop_path && `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})`;
  const posterPath = poster_path && `https://image.tmdb.org/t/p/w500/${poster_path}`;

  useEffect(() => {
    if (title) {
      setIsFetchingMovieInfo(false);
    }
  }, [poster_path]);

  const formatProductionCountry = () => {
    if (production_countries && production_countries[0]) {
      const {iso_3166_1} = production_countries[0];
      if (iso_3166_1) {
        return iso_3166_1;
      }
    } else {
      return '-';
    }
  };

  const formatRuntime = () => {
    if (runtime === 0) return 'runtime unknown';
    const hours = Math.trunc(runtime / 60);
    const minutes = runtime - hours * 60;
    if (hours < 1) return `${minutes}m`
    return `${hours}h ${minutes}m`;
  };

  return (
    <section className="movie-poster" style={{
      backgroundImage: backdropPath,
    }}>
      {isFetchingMovieInfo && <div className="movie-poster__loader-wrapper"><Loader/></div>}
      {!isFetchingMovieInfo &&
      <div className="movie-poster__background-blackout">
        <div className="movie-poster__container container">
          <div className="movie-poster__header">
            <Button name="Back to the movies"/>
          </div>
          <div className="movie-poster__content">
            <div className="movie-poster__image-wrapper">
              <img className="movie-poster__image" src={posterPath || defaultMovieImage}
                   alt=""/>
            </div>

            <div className="movie-poster__info">
              <div className="movie-poster__info-header">
                <h1 className="movie-poster__title">{title}</h1>
                <div className="movie-poster__subtitle-details">
                  <span className="movie-poster__date">{formatReleaseDate}</span>
                  <span
                    className="movie-poster__country">({formatProductionCountry()})</span>
                  <span className="movie-poster__genres">{getGenresList(genres)}</span>
                  <span className="movie-poster__runtime">{formatRuntime()}</span>
                </div>
              </div>
              <div className="movie-poster__info-content">
                <div className="movie-poster__rating">
                <span className="movie-poster__rating-text">
                  {getRating(vote_average)}
                </span>
                  <StarBorderIcon style={{fontSize: 25}}/>
                </div>
                <span className="movie-poster__tagline">
                {tagline}
              </span>
                <div className="movie-poster__overview-block">
                  <h3 className="movie-poster__block-title">Overview</h3>
                  <p className="movie-poster__overview">{overview}</p>
                </div>
                <div className="movie-poster__countries-block">
                  <h3 className="movie-poster__block-title">Countries</h3>
                  <p className="movie-poster__countries">{getCountriesList(production_countries)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </section>
  );
};

export default MoviePoster;
