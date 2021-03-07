import React from "react";
import {useHistory} from "react-router";
import PropTypes from "prop-types";

const Preview = React.memo(
  function Preview({lang, movieGenresInfo, allGenres, overview}) {
    const history = useHistory();

    const movieGenresFormat = () => {
      let movieGenres;
      if (history.location.pathname !== '/bookmarks') {
        movieGenres = allGenres.filter((genre) => movieGenresInfo.includes(genre.id));
      } else {
        movieGenres = movieGenresInfo;
      }
      const strMovieGenres = movieGenres.map((genre) => genre.name).join(' ,');
      return strMovieGenres.charAt(0).toUpperCase()
        + strMovieGenres.toLowerCase().slice(1) || 'Unnown genres';
    };

    return (
      <div className="preview">
        <div className="preview__header">
          <span className="preview__lang">{lang}</span>
        </div>
        <div className="preview__overview">
          <p className="preview__genres">
            {movieGenresFormat()}
          </p>
          <p className="preview__description">
            {overview}
          </p>
        </div>
      </div>
    );
  }
);


Preview.propTypes = {
  lang: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  movieGenresInfo: PropTypes.array.isRequired,
  allGenres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default Preview;

