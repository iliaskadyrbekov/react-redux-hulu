import React, {useState} from "react";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import defaultImage from "../../../assets/img/defaultImage.png";
import classNames from 'classnames';
import Preview from "./Preview";

const Movie = React.memo(function Movie({movie, genres}) {
  const [isShown, setIsShown] = useState(false); // for showing preview
  const [isBookmarked, setIsBookmarked] = useState(false);

  const {
    title, backdrop_path, release_date, vote_average,
    original_language, genre_ids, overview, poster_path
  } = movie;

  // useEffect(() => {
  //
  // }, []);

  const imageName = backdrop_path || poster_path;
  const imagePath = imageName ? `https://image.tmdb.org/t/p/w500/${imageName}` : defaultImage;
  const formatDate = release_date ? release_date.slice(0, 4) : 'soon';
  const formatRatings = (vote_average.toString().length === 1 || vote_average === 10) ? vote_average + '.0' : vote_average;
  const formatOverview = overview ? overview : 'Unnown description';

  return (
    <div className="movie"
         onMouseEnter={() => setIsShown(true)}
         onMouseLeave={() => setIsShown(false)}
    >
      <div className={classNames({
        'movie__wrapper-image': true,
        'movie__wrapper-image--template': !(backdrop_path || poster_path),
      })}>
        <img
          className={classNames({
            'movie__image': true,
            'movie__image--active': isShown,
            'movie__image--poster': !backdrop_path,
          })}
          src={imagePath}
          loading="lazy"
          alt="movie"
        />
        {isShown && <Preview lang={original_language}
                             genresID={genre_ids}
                             genres={genres}
                             overview={formatOverview}
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
});
export default Movie;
