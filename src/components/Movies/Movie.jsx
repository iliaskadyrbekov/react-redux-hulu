import React from "react";

const Movie = ({movie}) => {
  const image = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
  const formatTitle = movie.title.length > 22 ? movie.title.slice(0, 22).trim() + '...' : movie.title;
  const formatDate = movie.release_date.slice(0, 4);
  const formatRatings = movie.vote_average.toString().length === 1 ? movie.vote_average + '.0' : movie.vote_average;

  return (
    <div className="movie">
      <div className="movie__wrapper-image">
        <img className="movie__image" src={image} alt=""/>
      </div>
      <div className="movie__info">
        <span className="movie__title">
          {formatTitle}
        </span>
        <div className="movie__info-additional">
          <div className="movie__info-rating">
            {formatRatings}
          </div>
          <span className="movie__info-year">
            {formatDate}
          </span>
        </div>
      </div>
    </div>
  );
};


export default Movie;
