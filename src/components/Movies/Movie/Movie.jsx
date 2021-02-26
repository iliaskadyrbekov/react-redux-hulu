import React, {useState} from "react";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import classNames from 'classnames';
import Preview from "./Preview";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setLastHomePositionByY} from "../../../redux/movies/moviesActionCreator";
import {setCurrentLocationPath} from "../../../redux/movieInfo/movieInfoActionCreator";
import {getImagePath, getRating, getYear} from "../../../utils/formatMovieData";

const Movie = React.memo(function Movie({movie}) {
  const dispatch = useDispatch();
  const allGenres = useSelector(({movies}) => movies.genres);
  const [isShownPreview, setIsShownPreview] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const {
    id, title, backdrop_path, release_date, vote_average,
    original_language, genre_ids, overview, poster_path
  } = movie;

  const setLastPosition = () => {
    dispatch(setCurrentLocationPath(window.location.pathname));
    dispatch(setLastHomePositionByY(window.scrollY));
  };

  const getOverview = (overview) => {
    return overview ? overview : 'Unnown description';
  };

  return (
    <div className={classNames({
      'movie': true,
    })}
         onMouseEnter={() => setIsShownPreview(true)}
         onMouseLeave={() => setIsShownPreview(false)}
         onClick={setLastPosition}
    >
      <Link to={`/movies/${id}`} className="movie__link">
        <div className={classNames({
          'movie__wrapper-image': true,
          'movie__wrapper-image--template': !(backdrop_path || poster_path),
        })}>
          <img
            className={classNames({
              'movie__image': true,
              'movie__image--active': isShownPreview,
              'movie__image--poster': !backdrop_path,
            })}
            src={getImagePath(backdrop_path, poster_path)}
            loading="lazy"
            alt="movie"
          />
          {isShownPreview && <Preview
            lang={original_language}
            genresID={genre_ids}
            allGenres={allGenres}
            overview={getOverview(overview)}
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
              {getRating(vote_average)}
            </span>
              <StarBorderIcon style={{fontSize: 22}}/>
            </div>
            <span className="movie__info-year">
            {getYear(release_date)}
          </span>
          </div>
        </div>
      </Link>
    </div>
  );
});

export default Movie;
