import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Loader} from "../../Loader";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {getCountriesList, getGenresList, getRating} from "../../../utils/formatMovieData";

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
    if (posterPath) {
      setIsFetchingMovieInfo(false);
    }
  }, [posterPath]);

  const formatProductionCountry = () => {
    if (production_countries[0]) {
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
    <section className="movie-info__header-background-image" style={{
      backgroundImage: backdropPath,
    }}>
      {isFetchingMovieInfo && <Loader/>}
      {!isFetchingMovieInfo && <div className="movie-info__header-background-blackout">
        <div className="movie-info__header container">
          <img className="movie-info__image" src={posterPath}
               alt=""/>
          <div className="movie-info__main-content">
            <div className="movie-info__main-content-header">
              <h1 className="movie-info__title">{title}</h1>
              <div className="movie-info__subtitle-details">
                <span className="movie-info__date">{formatReleaseDate}</span>
                <span
                  className="movie-info__country">({formatProductionCountry()})</span>
                <span className="movie-info__genres">{getGenresList(genres)}</span>
                <span className="movie-info__runtime">{formatRuntime()}</span>
              </div>
            </div>
            <div className="movie-info__main-content-info">
              <div className="movie-info__rating">
                <span className="movie-info__rating-text">
                  {getRating(vote_average)}
                </span>
                <StarBorderIcon style={{fontSize: 25}}/>
              </div>
              <span className="movie-info__tagline">
                {tagline}
              </span>
              <div className="movie-info__overview-block">
                <h3 className="movie-info__block-title">Overview</h3>
                <p className="movie-info__overview">{overview}</p>
              </div>
              <div className="movie-info__countries-block">
                <h3 className="movie-info__block-title">Countries</h3>
                <p className="movie-info__countries">{getCountriesList(production_countries)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </section>
  );
};

export default MoviePoster;
