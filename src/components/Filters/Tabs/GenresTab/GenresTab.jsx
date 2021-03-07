import React from "react";
import {useSelector} from "react-redux";
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from "prop-types";

const GenresTab = React.memo(function GenresTab({copyCheckedGenres, setCheckboxStatus}) {
  const genres = useSelector(({movies}) => movies.genres);

  const listGenres = genres.map(genre => {
    const {id, name} = genre;
    return (
      <div className="filter-pop-up__checkbox-item"
           onClick={() => setCheckboxStatus(id, 'genres')} key={id}>
        <Checkbox
          checked={copyCheckedGenres.includes(id)}
          className="filter-pop-up__checkbox"
        />
        <span>{name}</span>
      </div>
    );
  });

  return (
    <div className="filter-pop-up__items">
      {listGenres}
    </div>
  );
});

GenresTab.propTypes = {
  copyCheckedGenres: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired,
  setCheckboxStatus: PropTypes.func.isRequired,
};

export default GenresTab;

