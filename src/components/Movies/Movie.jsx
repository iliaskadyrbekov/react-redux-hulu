import React from "react";
import StarBorderIcon from '@material-ui/icons/StarBorder';

const Movie = ({movie}) => {
  const {title, backdrop_path, release_date, vote_average} = movie;
  const image = `https://image.tmdb.org/t/p/w500/${backdrop_path}`;
  const formatTitle = title.length > 20 ? title.slice(0, 20).trim() + '...' : title;
  const formatDate = release_date ? release_date.slice(0, 4) : 'soon';
  const formatRatings = vote_average.toString().length === 1 ? vote_average + '.0' : vote_average;
  const templateClassName = !backdrop_path && "movie__wrapper-image--template";
  console.log(movie)
  return (
    <div className="movie">
      <div className={"movie__wrapper-image " + templateClassName}>
        <img className="movie__image" src={image} alt=""/>
      </div>
      <div className="movie__info">
        <span className="movie__info-title">
          {formatTitle}
        </span>
        <div className="movie__info-additional">
          <div className="movie__info-rating">
            <span className="movie__info-rating-number">
              {formatRatings}
            </span>
            <StarBorderIcon style={{fontSize: 22}}/>
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
