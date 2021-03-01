import React from "react";
import {useSelector} from "react-redux";
import Checkbox from '@material-ui/core/Checkbox';

const GenresTab = React.memo(function GenresTab({copyCheckedGenres, setCheckboxStatus}) {
  const genres = useSelector(({movies}) => movies.genres);

  const listGenres = genres.map(genre => {
    const {id, name} = genre;
    return (
      <div className="filter-pop-up__checkbox-item" key={id}>
        <div className="filter-pop-up__checkbox-wrapper"
             onClick={() => setCheckboxStatus(id, 'genres')}>
          <Checkbox
            checked={copyCheckedGenres.includes(id)}
            className="filter-pop-up__checkbox"
          />
          <span>{name}</span>
        </div>
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

