import React, {useState} from "react";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Preview from "./Preview";

const Movie = ({movie, genres}) => {
  const [isShown, setIsShown] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const {title, backdrop_path, release_date, vote_average, original_language, genre_ids, overview} = movie;
  const image = `https://image.tmdb.org/t/p/w500/${backdrop_path}`;
  const formatDate = release_date ? release_date.slice(0, 4) : 'soon';
  const formatRatings = vote_average.toString().length === 1 ? vote_average + '.0' : vote_average;
  const templateClassName = !backdrop_path ? " movie__wrapper-image--template" : "";
  const imageClassName = isShown ? " movie__image--active" : "";

  return (
    <div className="movie"
         onMouseEnter={() => setIsShown(true)}
         onMouseLeave={() => setIsShown(false)}
    >
      <div className={"movie__wrapper-image" + templateClassName}>
        <img className={"movie__image" + imageClassName} src={image} alt=""/>
        {isShown && <Preview lang={original_language}
                             genresID={genre_ids}
                             genres={genres}
                             overview={overview}
                             isBookmarked={isBookmarked}
                             setIsBookmarked={setIsBookmarked}
        />}
      </div>
      <div className="movie__info">
        <p className="movie__info-title">
          {title}
        </p>
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
