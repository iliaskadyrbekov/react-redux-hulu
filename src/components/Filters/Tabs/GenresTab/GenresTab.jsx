import React from "react";
import {useSelector} from "react-redux";
import Checkbox from '@material-ui/core/Checkbox';

const GenresTab = React.memo(function GenresTab({copyCheckedGenres, setCheckboxStatus}) {
  const genres = useSelector(({movies}) => movies.genres);

  const listGenres = genres.map(genre => {
    const {id, name} = genre;
    return (
      <div className="filter-pop-up__items-item" key={id} onClick={() => setCheckboxStatus(id, 'genres')}>
        <Checkbox
          checked={copyCheckedGenres.includes(id)}
          className="filter-pop-up__items-item-checkbox"
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

export default GenresTab;

