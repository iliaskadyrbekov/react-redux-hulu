import React from 'react';
import {useSelector} from "react-redux";

const MoviePoster = () => {
  const {
    title, poster_path, release_date, genres, runtime,
    backdrop_path, tagline, overview, production_countries,
  } = useSelector(({movieInfo}) => movieInfo.movieInfo);

  const formatGenres = genres && genres.map(genre => genre.name).join(', ');
  const formatReleaseDate = release_date && release_date.split('-').reverse().join('/');
  const backdropPath = backdrop_path && `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})`;
  const posterPath = poster_path && `https://image.tmdb.org/t/p/w500/${poster_path}`;

  const formatProductionCountry = () => {
    if (production_countries) {
      const {iso_3166_1} = production_countries[0];
      return iso_3166_1;
    }
  }

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
      <div className="movie-info__header-background-blackout">
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
                <span className="movie-info__genres">{genres && formatGenres}</span>
                <span className="movie-info__runtime">{formatRuntime()}</span>
              </div>
            </div>
            <div className="movie-info__main-content-info">
                <span className="movie-info__tagline">
                  {tagline}
                </span>
              <div className="movie-info__overview-block">
                <h3 className="movie-info__overview-title">Overview</h3>
                <p className="movie-info__overview">{overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoviePoster;